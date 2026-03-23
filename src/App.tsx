import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardView from './components/DashboardView';
import POSView from './components/POSView';
import InventoryView from './components/InventoryView';
import ServicesView from './components/ServicesView';
import ClientsView from './components/ClientsView';
import EcommerceView from './components/EcommerceView';
import PurchasesView from './components/PurchasesView';
import HRView from './components/HRView';
import AttendanceView from './components/AttendanceView';
import FinanceView from './components/FinanceView';
import SettingsView from './components/SettingsView';
import ITView from './components/ITView';
import TransactionsView from './components/TransactionsView';
import MarketingView from './components/MarketingView';
import LoginView from './components/LoginView';
import { ViewState } from './types';
import type { Branch, Employee} from "./types"
import { BRANCHES } from './constants';
import { Construction } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [currentBranch, setCurrentBranch] = useState<Branch>(BRANCHES[0]);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  const handleBranchChange = (branchId: string) => {
    const branch = BRANCHES.find(b => b.id === branchId);
    if (branch) setCurrentBranch(branch);
  };

  const handleLogin = (user: Employee) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const renderContent = () => {
    if (!currentUser) return null;

    switch (currentView) {
      case ViewState.DASHBOARD:
        return <DashboardView onNavigate={setCurrentView} currentUser={currentUser} />;
      case ViewState.POS:
        return <POSView />;
      case ViewState.INVENTORY:
        return <InventoryView />;
      case ViewState.SERVICES:
        return <ServicesView />;
      case ViewState.CLIENTS:
        return <ClientsView />;
      case ViewState.ECOMMERCE:
        return <EcommerceView />;
      case ViewState.PURCHASES:
        return <PurchasesView />;
      case ViewState.HR:
        return <HRView />;
      case ViewState.ATTENDANCE:
        return <AttendanceView />;
      case ViewState.FINANCE:
        return <FinanceView />;
      case ViewState.SETTINGS:
        return <SettingsView />;
      case ViewState.IT:
        return <ITView />;
      case ViewState.MARKETING:
        return <MarketingView />;
      case ViewState.TRANSACTIONS:
        return <TransactionsView onBack={() => setCurrentView(ViewState.DASHBOARD)} />;
      default:
        // Fallback
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Construction size={64} className="mb-4 text-kanu-400" />
            <h2 className="text-2xl font-bold text-gray-600">Módulo en Construcción</h2>
            <p className="mt-2 text-gray-500">La funcionalidad de {currentView} estará disponible próximamente.</p>
          </div>
        );
    }
  };

  if (!isAuthenticated || !currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <Layout
      currentView={currentView}
      onNavigate={setCurrentView}
      userRole={currentUser.role}
      currentBranch={currentBranch}
      onBranchChange={handleBranchChange}
      onLogout={handleLogout}
      userName={currentUser.name}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;