import { useEffect, useState } from 'react';
import {
  DEFAULT_ORDER_CONFIG,
  INITIAL_ORDERS,
} from './data/catalog';
import {
  OrderConfig,
  OrderRecord,
  OrderStatus,
  PageId,
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CustomizePage } from './pages/CustomizePage';
import { SummaryPage } from './pages/SummaryPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AdminPage } from './pages/AdminPage';

const ORDER_CONFIG_KEY = 'ee_order_config_v1';
const ORDERS_LIST_KEY = 'ee_orders_v1';
const BATCH_OPEN_KEY = 'ee_batch_open_v1';

function loadSavedConfig(): OrderConfig {
  try {
    const raw = localStorage.getItem(ORDER_CONFIG_KEY);
    if (raw) {
      return { ...DEFAULT_ORDER_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_ORDER_CONFIG;
}

function loadSavedOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(ORDERS_LIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore storage errors
  }
  return INITIAL_ORDERS;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('inicio');
  const [orderConfig, setOrderConfig] = useState<OrderConfig>(loadSavedConfig);
  const [orders, setOrders] = useState<OrderRecord[]>(loadSavedOrders);
  const [selectedTrackCode, setSelectedTrackCode] = useState<string>(
    () => loadSavedOrders()[0]?.code || 'EE-2026-0001',
  );
  const [batchOpen, setBatchOpen] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(BATCH_OPEN_KEY);
      return raw === null ? true : raw === 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_CONFIG_KEY, JSON.stringify(orderConfig));
    } catch {
      // ignore
    }
  }, [orderConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_LIST_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(BATCH_OPEN_KEY, String(batchOpen));
    } catch {
      // ignore
    }
  }, [batchOpen]);

  const navigate = (page: PageId, anchor?: string) => {
    setCurrentPage(page);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartCustomize = (preset: Partial<OrderConfig>) => {
    setOrderConfig((prev) => ({
      ...prev,
      ...preset,
      approved: false,
    }));
    navigate('personalizar');
  };

  const handleCreateOrder = (
    payload: Omit<OrderRecord, 'code' | 'batchNumber' | 'createdAt' | 'status'>,
  ): OrderRecord => {
    const nextNum = orders.length + 1;
    const code = `EE-2026-${String(nextNum).padStart(4, '0')}`;
    const newOrder: OrderRecord = {
      ...payload,
      code,
      batchNumber: 14,
      createdAt: new Date().toISOString(),
      status: 'pedido_recebido',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setSelectedTrackCode(code);
    return newOrder;
  };

  const handleUpdateOrderStatus = (code: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.code === code ? { ...o, status } : o)));
  };

  const customizerProgress = `${orderConfig.approved ? 6 : 5} / 6`;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        progressText={customizerProgress}
      />

      <main className="flex-1 flex flex-col">
        {currentPage === 'inicio' && (
          <HomePage onNavigate={navigate} onStartCustomize={handleStartCustomize} />
        )}
        {currentPage === 'pecas' && (
          <CatalogPage onNavigate={navigate} onStartCustomize={handleStartCustomize} />
        )}
        {currentPage === 'personalizar' && (
          <CustomizePage
            config={orderConfig}
            onChangeConfig={setOrderConfig}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'resumo' && (
          <SummaryPage
            config={orderConfig}
            batchOpen={batchOpen}
            onNavigate={navigate}
            onCreateOrder={handleCreateOrder}
            onSelectTrackingCode={setSelectedTrackCode}
          />
        )}
        {currentPage === 'acompanhar' && (
          <TrackOrderPage
            orders={orders}
            selectedCode={selectedTrackCode}
            onSelectCode={setSelectedTrackCode}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'admin' && (
          <AdminPage
            orders={orders}
            batchOpen={batchOpen}
            onToggleBatch={() => setBatchOpen((v) => !v)}
            onUpdateStatus={handleUpdateOrderStatus}
            onInspectOrder={setSelectedTrackCode}
            onNavigate={navigate}
          />
        )}
      </main>

      {currentPage !== 'personalizar' ? (
        <Footer onNavigate={navigate} />
      ) : (
        <div className="hidden lg:block mt-12">
          <Footer onNavigate={navigate} />
        </div>
      )}
    </div>
  );
}
