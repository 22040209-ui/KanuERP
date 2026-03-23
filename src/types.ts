export const Role = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  SALES: 'SALES',
  RECEPCION: 'RECEPCION',
  BODEGA: 'BODEGA',
  SEGURIDAD: 'SEGURIDAD',
  MARKETING: 'MARKETING',
  FINANCE: 'FINANCE',
  HR: 'HR',
  IT: 'IT',
  STYLIST: 'STYLIST',
} as const;

export type Role = typeof Role[keyof typeof Role];

export const ViewState = {
  DASHBOARD: 'DASHBOARD',
  POS: 'POS',
  INVENTORY: 'INVENTORY',
  SERVICES: 'SERVICES',
  CLIENTS: 'CLIENTS',
  HR: 'HR',
  ATTENDANCE: 'ATTENDANCE',
  FINANCE: 'FINANCE',
  ECOMMERCE: 'ECOMMERCE',
  PURCHASES: 'PURCHASES',
  SETTINGS: 'SETTINGS',
  IT: 'IT',
  TRANSACTIONS: 'TRANSACTIONS',
  MARKETING: 'MARKETING',
} as const;

export type ViewState = typeof ViewState[keyof typeof ViewState];
export const ProductType = {
  PRODUCT: 'PRODUCT',
  SERVICE: 'SERVICE',
} as const;

export type ProductType = typeof ProductType[keyof typeof ProductType];
// Interfaces
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  image: string;
  type: ProductType;
  branch: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Employee {
  id: string;
  name: string;
  role: Role;
  branch: string;
  status: 'Activo' | 'Inactivo';
  email: string;
  password?: string;
  phone?: string;
  joinDate?: string;
  salary?: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  petNames: string[];
  lastVisit: string;
  status: 'Activo' | 'Inactivo';
  loyaltyPoints: number;
  notes?: string;
}

export interface Appointment {
  id: string;
  petName: string;
  ownerName: string;
  service: string;
  stylistId: string;
  date: string;
  time: string;
  status: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
}

export interface Sale {
  id: string;
  date: string;
  total: number;
  items: number;
  method: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  branch: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
}

// New Interfaces for Modules
export interface OnlineOrder {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pendiente' | 'Preparando' | 'Enviado' | 'Entregado';
  paymentStatus: 'Pagado' | 'Pendiente';
  itemsCount: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  rating: number; 
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  date: string;
  expectedDate: string;
  total: number;
  status: 'Borrador' | 'Solicitado' | 'Recibido' | 'Cancelado';
  itemsCount: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'Ingreso' | 'Gasto';
  category: string;
  amount: number;
  status: 'Completado' | 'Pendiente';
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: string[];
  link?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pendiente' | 'En Progreso' | 'Completado';
  priority: 'Baja' | 'Media' | 'Alta';
  projectId?: string;
  assignedTo?: string;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  dueDate: string;
  health: 'Verde' | 'Amarillo' | 'Rojo';
  description: string;
  tasks: Task[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'Mensaje' | 'Cambio' | 'Alerta';
  read: boolean;
  link?: string;
}

export interface Approval {
  id: string;
  title: string;
  requester: string;
  date: string;
  type: 'Gasto' | 'Vacaciones' | 'Documento';
  status: 'Pendiente' | 'Aprobado' | 'Rechazado';
  amount?: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
  type: 'Acción' | 'Documento';
}

export interface DashboardWidget {
  id: string;
  title: string;
  visible: boolean;
  order: number;
}

export interface RoleKPI {
  label: string;
  value: string | number;
  target?: string | number;
  trend?: string;
  trendUp?: boolean;
  unit?: string;
  iconName: string; // Lucide icon name
}

export interface UserDashboardConfig {
  userId: string;
  widgets: DashboardWidget[];
  density: 'Compacta' | 'Expandida';
  showQuickActions: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: any;
  roles?: Role[];
  category?: 'main' | 'operations' | 'management' | 'system';
}
