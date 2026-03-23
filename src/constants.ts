import type { Product,  Employee, Appointment, Branch, Sale, OnlineOrder, 
  Supplier, PurchaseOrder, Transaction, Client, Meeting, Task, Project, AppNotification,
   Approval, Activity, RoleKPI, UserDashboardConfig, NavItem } from './types';
import { ProductType, Role } from './types';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Scissors, 
  Users, 
  DollarSign, 
  Globe, 
  Truck, 
  Settings,
  Server,
  Smile,
  Clock,
  Receipt,
  Megaphone
} from 'lucide-react';

export const BRANCHES: Branch[] = [
  { id: 'b1', name: 'Sucursal Matriz (Centro)', location: 'Av. Reforma 123' },
  { id: 'b2', name: 'Sucursal Norte', location: 'Plaza Satélite Local 4' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'KA-FOOD-001',
    name: 'Royal Canin Adulto 15kg',
    category: 'Alimento',
    price: 1850.00,
    cost: 1400.00,
    stock: 45,
    minStock: 10,
    image: 'https://picsum.photos/200/200?random=1',
    type: ProductType.PRODUCT,
    branch: 'b1'
  },
  {
    id: 'p2',
    sku: 'KA-TOY-005',
    name: 'Pelota Indestructible Kong',
    category: 'Juguetes',
    price: 350.00,
    cost: 180.00,
    stock: 12,
    minStock: 20,
    image: 'https://picsum.photos/200/200?random=2',
    type: ProductType.PRODUCT,
    branch: 'b1'
  },
  {
    id: 'p3',
    sku: 'KA-SERV-001',
    name: 'Baño y Corte (Raza Peq)',
    category: 'Estética',
    price: 450.00,
    cost: 100.00,
    stock: 999,
    minStock: 0,
    image: 'https://picsum.photos/200/200?random=3',
    type: ProductType.SERVICE,
    branch: 'b1'
  },
  {
    id: 'p4',
    sku: 'KA-ACC-022',
    name: 'Collar de Cuero Premium',
    category: 'Accesorios',
    price: 280.00,
    cost: 120.00,
    stock: 50,
    minStock: 5,
    image: 'https://picsum.photos/200/200?random=4',
    type: ProductType.PRODUCT,
    branch: 'b1'
  },
  {
    id: 'p5',
    sku: 'KA-FOOD-002',
    name: 'Nupec Cachorro 2kg',
    category: 'Alimento',
    price: 320.00,
    cost: 210.00,
    stock: 8,
    minStock: 15,
    image: 'https://picsum.photos/200/200?random=5',
    type: ProductType.PRODUCT,
    branch: 'b1'
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'e123456', name: 'Carlos Ruiz', role: Role.ADMIN, branch: 'b1', status: 'Activo', email: 'cruiz@kanu.com', password: 'admin', phone: '55-1234-5678', joinDate: '2021-03-15', salary: 25000 },
  { id: 'e2', name: 'Ana Lopez', role: Role.STYLIST, branch: 'b1', status: 'Activo', email: 'alopez@kanu.com', password: '123', phone: '55-8765-4321', joinDate: '2022-01-10', salary: 12000 },
  { id: 'e3', name: 'Jorge M.', role: Role.SALES, branch: 'b1', status: 'Activo', email: 'jorge@kanu.com', password: '123', phone: '55-5555-5555', joinDate: '2023-05-20', salary: 9000 },
  { id: 'e4', name: 'Marta Solis', role: Role.MANAGER, branch: 'b2', status: 'Activo', email: 'msolis@kanu.com', password: '123', phone: '55-4444-3333', joinDate: '2020-11-01', salary: 18000 },
  { id: 'e5', name: 'Marketing User', role: Role.MARKETING, branch: 'b1', status: 'Activo', email: 'marketing@kanu.com', password: '123', phone: '55-1111-2222', joinDate: '2023-01-01', salary: 15000 },
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Luis Perez', email: 'lperez@gmail.com', phone: '55-9988-7766', address: 'Av. Siempre Viva 123', petNames: ['Max'], lastVisit: '2023-10-20', status: 'Activo', loyaltyPoints: 150 },
  { id: 'c2', name: 'Maria Gonzalez', email: 'mariag@hotmail.com', phone: '55-1122-3344', address: 'Calle 5 Sur', petNames: ['Luna', 'Sol'], lastVisit: '2023-09-15', status: 'Activo', loyaltyPoints: 320 },
  { id: 'c3', name: 'Pedro Sanchez', email: 'pedro.s@yahoo.com', phone: '55-5566-7788', address: 'Reforma 456', petNames: ['Rocky'], lastVisit: '2023-05-10', status: 'Inactivo', loyaltyPoints: 0 },
  { id: 'c4', name: 'Ana Torres', email: 'atorres@gmail.com', phone: '55-3344-5566', address: 'Polanco 88', petNames: ['Pelusa'], lastVisit: '2023-10-25', status: 'Activo', loyaltyPoints: 50 },
  { id: 'c5', name: 'Roberto Diaz', email: 'rdiaz@outlook.com', phone: '55-7777-8888', address: 'Del Valle 900', petNames: ['Bruno', 'Kira'], lastVisit: '2023-10-01', status: 'Activo', loyaltyPoints: 210 },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', petName: 'Max', ownerName: 'Luis Perez', service: 'Baño y Corte', stylistId: 'e2', date: '2023-10-27', time: '10:00', status: 'En Proceso' },
  { id: 'a2', petName: 'Luna', ownerName: 'Maria G.', service: 'Solo Baño', stylistId: 'e2', date: '2023-10-27', time: '11:30', status: 'Pendiente' },
  { id: 'a3', petName: 'Rocky', ownerName: 'Pedro S.', service: 'Corte de Uñas', stylistId: 'e2', date: '2023-10-27', time: '13:00', status: 'Completado' },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'main' },
  { id: 'pos', label: 'Punto de Venta', icon: ShoppingCart, roles: [Role.ADMIN, Role.MANAGER, Role.SALES], category: 'operations' },
  { id: 'inventory', label: 'Inventario', icon: Package, roles: [Role.ADMIN, Role.MANAGER, Role.BODEGA, Role.RECEPCION], category: 'operations' },
  { id: 'transactions', label: 'Transacciones', icon: Receipt, roles: [Role.ADMIN, Role.MANAGER, Role.FINANCE], category: 'operations' },
  { id: 'services', label: 'Servicios & Citas', icon: Scissors, roles: [Role.ADMIN, Role.MANAGER, Role.STYLIST], category: 'operations' },
  { id: 'clients', label: 'Clientes', icon: Smile, roles: [Role.ADMIN, Role.MANAGER, Role.SALES, Role.STYLIST, Role.MARKETING], category: 'operations' },
  { id: 'ecommerce', label: 'E-commerce', icon: Globe, roles: [Role.ADMIN, Role.MANAGER, Role.MARKETING], category: 'operations' },
  { id: 'purchases', label: 'Compras', icon: Truck, roles: [Role.ADMIN, Role.MANAGER, Role.RECEPCION, Role.FINANCE], category: 'operations' },
  { id: 'hr', label: 'RH', icon: Users, roles: [Role.ADMIN, Role.MANAGER, Role.HR], category: 'management' },
  { id: 'attendance', label: 'Asistencia', icon: Clock, roles: [Role.ADMIN, Role.MANAGER, Role.HR], category: 'management' },
  { id: 'finance', label: 'Finanzas', icon: DollarSign, roles: [Role.ADMIN, Role.MANAGER, Role.FINANCE], category: 'management' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, roles: [Role.ADMIN, Role.MANAGER, Role.MARKETING], category: 'management' },
  { id: 'it', label: 'IT & Soporte', icon: Server, roles: [Role.ADMIN, Role.IT], category: 'system' },
  { id: 'settings', label: 'Configuración', icon: Settings, roles: [Role.ADMIN], category: 'system' },
];

// Mock Data for Charts
export const SALES_DATA = [
  { name: 'Lun', ventas: 12000 },
  { name: 'Mar', ventas: 15500 },
  { name: 'Mie', ventas: 11000 },
  { name: 'Jue', ventas: 18000 },
  { name: 'Vie', ventas: 24000 },
  { name: 'Sab', ventas: 32000 },
  { name: 'Dom', ventas: 28000 },
];

export const FINANCIAL_DATA = [
  { name: 'Ene', ingresos: 45000, gastos: 32000 },
  { name: 'Feb', ingresos: 52000, gastos: 34000 },
  { name: 'Mar', ingresos: 48000, gastos: 30000 },
  { name: 'Abr', ingresos: 61000, gastos: 35000 },
  { name: 'May', ingresos: 55000, gastos: 40000 },
  { name: 'Jun', ingresos: 67000, gastos: 38000 },
];

export const RECENT_SALES: Sale[] = [
  { id: 'T-1024', date: '2023-10-27 10:45', total: 1850.00, items: 1, method: 'Tarjeta', branch: 'b1' },
  { id: 'T-1025', date: '2023-10-27 11:12', total: 350.00, items: 2, method: 'Efectivo', branch: 'b1' },
  { id: 'T-1026', date: '2023-10-27 11:30', total: 2800.00, items: 4, method: 'Tarjeta', branch: 'b1' },
];

export const MOCK_ONLINE_ORDERS: OnlineOrder[] = [
  { id: 'WEB-5001', customerName: 'Fernanda Ortiz', date: '2023-10-26', total: 1200.00, status: 'Pendiente', paymentStatus: 'Pagado', itemsCount: 3 },
  { id: 'WEB-5002', customerName: 'Roberto Díaz', date: '2023-10-26', total: 450.00, status: 'Enviado', paymentStatus: 'Pagado', itemsCount: 1 },
  { id: 'WEB-5003', customerName: 'Camila S.', date: '2023-10-25', total: 850.00, status: 'Entregado', paymentStatus: 'Pagado', itemsCount: 2 },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'sup1', name: 'Distribuidora PetFood', contactName: 'Juan Perez', email: 'ventas@petfood.com', phone: '55-1111-2222', category: 'Alimentos', rating: 4.8 },
  { id: 'sup2', name: 'Accesorios Caninos SA', contactName: 'Maria Rodriguez', email: 'contacto@accaninos.com', phone: '55-3333-4444', category: 'Accesorios', rating: 4.5 },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-2023-001', supplierId: 'sup1', date: '2023-10-20', expectedDate: '2023-10-25', total: 15000.00, status: 'Recibido', itemsCount: 50 },
  { id: 'PO-2023-002', supplierId: 'sup2', date: '2023-10-22', expectedDate: '2023-10-28', total: 5000.00, status: 'Solicitado', itemsCount: 20 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'trx1', date: '2023-10-27', description: 'Venta del día', type: 'Ingreso', category: 'Ventas', amount: 24500.00, status: 'Completado' },
  { id: 'trx2', date: '2023-10-26', description: 'Pago a Proveedor PetFood', type: 'Gasto', category: 'Compras', amount: 15000.00, status: 'Completado' },
  { id: 'trx3', date: '2023-10-26', description: 'Servicios de Luz', type: 'Gasto', category: 'Servicios', amount: 3500.00, status: 'Pendiente' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj1',
    name: 'Expansión Sucursal Sur',
    progress: 65,
    dueDate: '2026-05-15',
    health: 'Verde',
    description: 'Apertura de la nueva sucursal en el sur de la ciudad.',
    tasks: [
      { id: 't101', title: 'Firma de contrato local', description: '', dueDate: '2026-03-25', status: 'Completado', priority: 'Alta', projectId: 'proj1' },
      { id: 't102', title: 'Diseño de interiores', description: '', dueDate: '2026-04-10', status: 'En Progreso', priority: 'Media', projectId: 'proj1' }
    ]
  },
  {
    id: 'proj2',
    name: 'E-commerce Redesign',
    progress: 30,
    dueDate: '2026-06-01',
    health: 'Amarillo',
    description: 'Actualización de la plataforma de ventas online.',
    tasks: [
      { id: 't201', title: 'Definición de UX', description: '', dueDate: '2026-03-30', status: 'En Progreso', priority: 'Alta', projectId: 'proj2' }
    ]
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', title: 'Nuevo Mensaje', message: 'Marta Solis comentó en tu tarea "Revisión de Inventario".', date: '2026-03-22 10:30', type: 'Mensaje', read: false },
  { id: 'n2', title: 'Cambio en Proyecto', message: 'El progreso de "Expansión Sucursal Sur" aumentó al 65%.', date: '2026-03-22 09:15', type: 'Cambio', read: true },
  { id: 'n3', title: 'Alerta de Stock', message: 'El producto "Nupec Cachorro" está por debajo del mínimo.', date: '2026-03-21 16:45', type: 'Alerta', read: false }
];

export const MOCK_APPROVALS: Approval[] = [
  { id: 'app1', title: 'Gasto de Marketing', requester: 'Jorge M.', date: '2026-03-21', type: 'Gasto', status: 'Pendiente', amount: 1500.00 },
  { id: 'app2', title: 'Vacaciones Semana Santa', requester: 'Ana Lopez', date: '2026-03-20', type: 'Vacaciones', status: 'Pendiente' },
  { id: 'app3', title: 'Contrato Proveedor Nuevo', requester: 'Marta Solis', date: '2026-03-22', type: 'Documento', status: 'Pendiente' }
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'act1', user: 'Carlos Ruiz', action: 'Actualizó el stock de', target: 'Royal Canin Adulto', date: '2026-03-22 11:20', type: 'Acción' },
  { id: 'act2', user: 'Marta Solis', action: 'Subió nuevo documento', target: 'Manual de Procedimientos.pdf', date: '2026-03-22 10:05', type: 'Documento' },
  { id: 'act3', user: 'Jorge M.', action: 'Completó la venta', target: 'T-1024', date: '2026-03-22 09:45', type: 'Acción' }
];

export const MOCK_ROLE_KPIS: Record<string, RoleKPI[]> = {
  [Role.ADMIN]: [
    { label: 'Ventas Totales', value: 154200, target: 180000, trend: '+8%', trendUp: true, unit: '$', iconName: 'DollarSign' },
    { label: 'Asistencia Equipo', value: 92, target: 95, trend: '-2%', trendUp: false, unit: '%', iconName: 'Users' },
    { label: 'Órdenes Pendientes', value: 15, target: 0, trend: 'Acción Req.', trendUp: false, iconName: 'ShoppingBag' },
    { label: 'Presupuesto Ejecutado', value: 65, target: 100, trend: 'En Meta', trendUp: true, unit: '%', iconName: 'PieChart' }
  ],
  [Role.SALES]: [
    { label: 'Cuota Mensual', value: 45000, target: 60000, trend: '75%', trendUp: true, unit: '$', iconName: 'Target' },
    { label: 'Tickets Hoy', value: 12, target: 15, trend: '+2', trendUp: true, iconName: 'Ticket' },
    { label: 'Conversión', value: 18, target: 20, trend: '-1%', trendUp: false, unit: '%', iconName: 'TrendingUp' }
  ],
  [Role.RECEPCION]: [
    { label: 'Envíos Hoy', value: 8, target: 10, trend: '80%', trendUp: true, iconName: 'Truck' },
    { label: 'Pendiente Inspección', value: 3, target: 0, trend: 'Urgente', trendUp: false, iconName: 'Clock' },
    { label: 'Espacio Disponible', value: 25, target: 100, unit: '%', iconName: 'Package' }
  ],
  [Role.BODEGA]: [
    { label: 'Exactitud Inventario', value: 99.2, target: 100, unit: '%', iconName: 'CheckCircle' },
    { label: 'Picking Speed', value: '4.2m', target: '5m', trend: '-0.5m', trendUp: true, iconName: 'Activity' },
    { label: 'Stock Crítico', value: 12, target: 0, trend: 'Revisar', trendUp: false, iconName: 'AlertCircle' }
  ],
  [Role.SEGURIDAD]: [
    { label: 'Incidentes Mes', value: 0, target: 0, trend: 'Limpio', trendUp: true, iconName: 'ShieldCheck' },
    { label: 'Cámaras Activas', value: 24, target: 24, unit: '/24', iconName: 'Activity' },
    { label: 'Accesos Hoy', value: 145, iconName: 'Users' }
  ],
  [Role.MARKETING]: [
    { label: 'Leads Generados', value: 450, target: 500, trend: '+12%', trendUp: true, iconName: 'UserPlus' },
    { label: 'ROI Campaña', value: 3.5, target: 4.0, unit: 'x', iconName: 'TrendingUp' },
    { label: 'Engagement', value: 4.2, target: 5.0, unit: '%', iconName: 'Smile' }
  ],
  [Role.FINANCE]: [
    { label: 'Flujo de Caja', value: 85000, target: 100000, unit: '$', iconName: 'Wallet' },
    { label: 'Facturas Pendientes', value: 14, target: 0, trend: 'Revisar', trendUp: false, iconName: 'FileText' },
    { label: 'Margen Neto', value: 22, target: 25, unit: '%', iconName: 'PieChart' }
  ],
  [Role.HR]: [
    { label: 'Vacantes Abiertas', value: 4, target: 0, iconName: 'UserPlus' },
    { label: 'Asistencia Hoy', value: 98, target: 100, unit: '%', iconName: 'CheckCircle' },
    { label: 'Capacitaciones', value: 2, target: 5, iconName: 'BookOpen' }
  ],
  [Role.IT]: [
    { label: 'Uptime Sistemas', value: 99.99, target: 100, unit: '%', iconName: 'Server' },
    { label: 'Tickets Abiertos', value: 5, target: 0, trend: '-2', trendUp: true, iconName: 'Ticket' },
    { label: 'Carga Servidor', value: 42, target: 80, unit: '%', iconName: 'Activity' }
  ],
  [Role.MANAGER]: [
    { label: 'Ingresos Sucursal', value: 124500, target: 150000, trend: '+15%', trendUp: true, unit: '$', iconName: 'DollarSign' },
    { label: 'Satisfacción', value: 4.9, target: 5.0, trend: '+0.1', trendUp: true, iconName: 'Smile' },
    { label: 'Productividad', value: 92, target: 95, unit: '%', iconName: 'Activity' }
  ],
  [Role.STYLIST]: [
    { label: 'Citas Hoy', value: 8, target: 10, trend: '80%', trendUp: true, iconName: 'Clock' },
    { label: 'Propinas Mes', value: 1240, target: 1000, trend: '+12%', trendUp: true, unit: '$', iconName: 'Wallet' },
    { label: 'Retención', value: 85, target: 90, unit: '%', iconName: 'Users' }
  ]
};

export const MOCK_DASHBOARD_CONFIG: UserDashboardConfig = {
  userId: 'e123456',
  density: 'Expandida',
  showQuickActions: true,
  widgets: [
    { id: 'role_content', title: 'Contenido por Rol', visible: true, order: 0 },
    { id: 'today', title: 'Mi día de hoy', visible: true, order: 1 },
    { id: 'projects', title: 'Mis proyectos activos', visible: true, order: 2 },
    { id: 'notifications', title: 'Notificaciones y Aprobaciones', visible: true, order: 3 },
    { id: 'kpis', title: 'KPIs Personales', visible: true, order: 4 },
    { id: 'activity', title: 'Actividad Reciente', visible: true, order: 5 }
  ]
};

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'Revisión de Inventario Trimestral',
    date: '2026-03-23',
    time: '09:00',
    location: 'Sala de Juntas Matriz',
    participants: ['Carlos Ruiz', 'Marta Solis', 'Jorge M.']
  },
  {
    id: 'm2',
    title: 'Capacitación Nuevo Sistema POS',
    date: '2026-03-24',
    time: '15:30',
    location: 'Virtual via Zoom',
    participants: ['Todo el personal de ventas'],
    link: 'https://zoom.us/j/123456789'
  },
  {
    id: 'm3',
    title: 'Planificación Campaña Adopción',
    date: '2026-03-22',
    time: '16:00',
    location: 'Oficina de Marketing',
    participants: ['Carlos Ruiz', 'Ana Lopez']
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Aprobar Órdenes de Compra',
    description: 'Revisar y autorizar las órdenes PO-2023-002.',
    dueDate: '2026-03-22',
    status: 'Pendiente',
    priority: 'Alta'
  },
  {
    id: 't2',
    title: 'Revisar Reporte de Ventas',
    description: 'Analizar la tendencia de ventas.',
    dueDate: '2026-03-22',
    status: 'En Progreso',
    priority: 'Media'
  },
  {
    id: 't3',
    title: 'Actualizar Precios',
    description: 'Ajustar precios según catálogo.',
    dueDate: '2026-03-23',
    status: 'Pendiente',
    priority: 'Baja'
  }
];
