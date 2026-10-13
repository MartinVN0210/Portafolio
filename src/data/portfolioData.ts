export interface ScreenshotItem {
  url: string;
  title: string;
  caption: string;
}

export interface KeyTechnology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database / ETL' | 'Cloud & APIs' | 'Mobile' | 'Metodología & Herramientas';
}

export interface ProjectTechnicalDetails {
  problemSolved: string;
  keyTechnologies: KeyTechnology[];
  architecturePatterns: string;
  architecturalHighlights: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  dotColor: 'outline' | 'tertiary' | 'primary';
  title: string;
  shortDescription: string;
  fullDescription: string;
  architectureSummary: string;
  tags: string[];
  category: 'backend' | 'mobile' | 'data';
  repoUrl: string;
  coverImage: string;
  screenshots: ScreenshotItem[];
  technicalDetails: ProjectTechnicalDetails;
  highlights: string[];
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ml-crime-dashboard',
    slug: 'dashboard-delincuencia-ml',
    dotColor: 'primary',
    title: 'Dashboard Delincuencia ML & Data Warehouse',
    shortDescription:
      'Sistema de Data Warehouse y analítica predictiva con Machine Learning para modelar patrones delictivos a partir de datos del SESNSP.',
    fullDescription:
      'Plataforma integral de inteligencia de datos diseñada para procesar, normalizar y analizar grandes volúmenes de datos históricos de incidencia delictiva nacional provenientes del Secretariado Ejecutivo del Sistema Nacional de Seguridad Pública (SESNSP). Combina un robusto pipeline ETL en Pentaho, un Data Warehouse relacional en PostgreSQL bajo esquema de estrella, modelos predictivos en Python (scikit-learn) y cuadros de mando interactivos en Power BI.',
    architectureSummary:
      'Pipeline desacoplado en tres capas: Ingesta y ETL masivo con Pentaho Data Integration, Data Warehouse en PostgreSQL modelado con Esquema de Estrella (Star Schema OLAP) con hechos y dimensiones temporales/geográficas, y capa analítica dual compuesta por inferencia predictiva con Scikit-Learn y visualización ejecutiva en Power BI.',
    tags: ['PostgreSQL', 'Pentaho PDI', 'Scikit-Learn', 'Power BI', 'Python'],
    category: 'data',
    repoUrl: 'https://github.com/martinvillalobos/dashboard-delincuencia-ml',
    coverImage: '/proyectos/Delincuencia Dashboard/capturas/4-KPIS.png',
    screenshots: [
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/4-KPIS.png',
        title: 'Panel de Indicadores Clave (KPIs)',
        caption: 'Monitoreo de métricas prioritarias, deltas mensuales acumulados y semáforos de incidencia delictiva.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/1-Entrenamiento-Terminal.png',
        title: 'Entrenamiento del Modelo ML en Terminal',
        caption: 'Pipeline de ingeniería de características, ajuste de hiperparámetros y evaluación cruzada con scikit-learn.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/2-Inicio.png',
        title: 'Vista Ejecutiva Principal',
        caption: 'Tablero general de control con filtros temporales, resumen por entidad federativa y tipos de delito.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/3-Inicio.png',
        title: 'Filtros Dinámicos Multidimensionales',
        caption: 'Segmentación granular por municipio, año, mes y bien jurídico tutelado.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/5-Graficos.png',
        title: 'Análisis Comparativo Interanual',
        caption: 'Visualización de tendencias históricas y fluctuaciones porcentuales respecto a periodos previos.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/6-Graficos.png',
        title: 'Distribución Geográfica y Cuadrantes',
        caption: 'Mapeo espacial de incidencia delictiva y concentración por zonas de alto impacto.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/7-Graficos.png',
        title: 'Desglose por Bien Jurídico',
        caption: 'Agrupación taxonómica por delitos patrimoniales, contra la vida y seguridad ciudadana.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/8-Graficos.png',
        title: 'Matriz de Frecuencia y Estacionalidad',
        caption: 'Detección de patrones temporales, horas críticas y estacionalidad criminal.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/9-Graficos.png',
        title: 'Curvas de Regresión y Series de Tiempo',
        caption: 'Proyecciones matemáticas del comportamiento delictivo en horizontes de mediano y largo plazo.',
      },
      {
        url: '/proyectos/Delincuencia Dashboard/capturas/10-Graficos.png',
        title: 'Reporte Consolidado para Autoridades',
        caption: 'Vista ejecutiva optimizada para sustentar estrategias preventivas de seguridad pública.',
      },
    ],
    technicalDetails: {
      problemSolved:
        'Las instituciones de seguridad pública y fiscalías enfrentan millones de registros crudos mensuales distribuidos en formatos CSV no estandarizados del SESNSP. Esta dispersión impedía identificar a tiempo tendencias delictivas, municipios prioritarios o variaciones estacionales. El proyecto automatiza la ingesta masiva, normaliza los datos en un Data Warehouse y aplica modelos predictivos supervisados para anticipar incrementos o descensos de delitos.',
      keyTechnologies: [
        { name: 'PostgreSQL', category: 'Database / ETL' },
        { name: 'Pentaho Data Integration (PDI)', category: 'Database / ETL' },
        { name: 'Python (Scikit-Learn)', category: 'Backend' },
        { name: 'Power BI', category: 'Frontend' },
        { name: 'DBeaver', category: 'Metodología & Herramientas' },
        { name: 'Modelado Dimensional OLAP', category: 'Metodología & Herramientas' },
      ],
      architecturePatterns:
        'Esquema en Estrella (Star Schema OLAP) con tabla central de hechos `hechos_delincuencia` conectada a dimensiones limpias (`dim_tiempo`, `dim_municipio`, `dim_tipo_delito`, `dim_bien_juridico`). El pipeline desacopla la extracción y transformación (ETL en Pentaho con funciones de unpivot y sumas acumulativas) del entrenamiento de Machine Learning y la capa de presentación ejecutiva.',
      architecturalHighlights: [
        'Modelo dimensional Star Schema optimizado para consultas analíticas de agregación en milisegundos sobre más de 1.2 millones de registros.',
        'Pipeline ETL determinista en Pentaho PDI con normalización unpivot, cálculo de variaciones mensuales y running totals.',
        'Modelos de regresión y clasificación supervisada en Scikit-Learn para estimación de riesgo y tendencia futura.',
        'Integración nativa con Power BI para tableros ejecutivos con cross-filtering multidimensional instantáneo.',
      ],
    },
    highlights: [
      'Modelado predictivo de series temporales y clasificación espacial para anticipar picos de incidencia delictiva.',
      'Data Warehouse en PostgreSQL estructurado bajo Esquema de Estrella con consultas analíticas de alta velocidad.',
      'Visualización interactiva en Power BI con análisis de importancia de variables (Feature Importance).',
    ],
    codeSnippet: {
      filename: 'src/analytics/etl_star_schema.sql',
      language: 'sql',
      code: `-- Data Warehouse Star Schema - Hechos de Incidencia Delictiva
CREATE TABLE hechos_delincuencia (
    hecho_sk BIGSERIAL PRIMARY KEY,
    tiempo_sk INT NOT NULL REFERENCES dim_tiempo(tiempo_sk),
    municipio_sk INT NOT NULL REFERENCES dim_municipio(municipio_sk),
    tipo_delito_sk INT NOT NULL REFERENCES dim_tipo_delito(tipo_delito_sk),
    bien_juridico_sk INT NOT NULL REFERENCES dim_bien_juridico(bien_juridico_sk),
    carpetas_investigacion INT NOT NULL DEFAULT 0,
    variacion_mes_anterior INT,
    acumulado_anual INT,
    media_movil_3m NUMERIC(10, 2),
    indice_riesgo_ml NUMERIC(6, 4)
);

CREATE INDEX idx_hechos_dw_lookup 
ON hechos_delincuencia (tiempo_sk, municipio_sk, tipo_delito_sk);`,
    },
  },
  {
    id: 'kanbly-task-manager',
    slug: 'kanbly-task-manager',
    dotColor: 'tertiary',
    title: 'Kanbly Task Manager',
    shortDescription:
      'Herramienta colaborativa de gestión de proyectos y tableros Kanban en tiempo real desarrollada en Flutter y Firebase.',
    fullDescription:
      'Espacio de trabajo colaborativo multiplataforma para equipos de desarrollo e ingeniería. Resuelve la desorganización, el seguimiento opaco de actividades y los problemas de comunicación en equipos de trabajo mediante tableros Kanban interactivos, asignación de tareas, estimaciones de tiempo y sincronización reactiva multi-dispositivo respaldada por Cloud Firestore.',
    architectureSummary:
      'Arquitectura Modelo-Vista-Controlador (MVC) y diseño modular desacoplado. Aplica patrones de diseño de software Observer (para suscripciones continuas a streams de Firestore), Command y Strategy para operaciones en tarjetas, complementado con un backend auxiliar en Laravel para lógica de negocio corporativa.',
    tags: ['Flutter', 'Firebase', 'MVC', 'Dart', 'Laravel'],
    category: 'mobile',
    repoUrl: 'https://github.com/martinvillalobos/kanbly-task-manager',
    coverImage: '/proyectos/Kanbly/Capturas/3-Interfaz-Tareas.jpeg',
    screenshots: [
      {
        url: '/proyectos/Kanbly/Capturas/3-Interfaz-Tareas.jpeg',
        title: 'Tablero Kanban de Tareas en Vivo',
        caption: 'Vista principal del tablero con columnas dinámicas, tarjetas de trabajo y tags de prioridad.',
      },
      {
        url: '/proyectos/Kanbly/Capturas/3-Interfaz-Crear-Tarea.jpeg',
        title: 'Formulario de Creación de Tarea',
        caption: 'Captura estructurada de títulos, descripciones, fechas de entrega y asignación de responsables.',
      },
      {
        url: '/proyectos/Kanbly/Capturas/1-Inicio.jpeg',
        title: 'Autenticación y Bienvenida',
        caption: 'Inicio de sesión seguro integrado con Firebase Authentication y validación de credenciales.',
      },
      {
        url: '/proyectos/Kanbly/Capturas/2-Registro.jpeg',
        title: 'Portal de Registro de Usuario',
        caption: 'Flujo de alta para nuevos colaboradores con selección de rol en el equipo.',
      },
    ],
    technicalDetails: {
      problemSolved:
        'En entornos académicos y equipos de desarrollo es común experimentar mala gestión del tiempo, falta de visibilidad en el avance de proyectos y pérdidas de información causadas por canales de comunicación no centralizados. Kanbly ofrece un entorno ágil centralizado que visualiza el flujo de trabajo en tiempo real, reduce cuellos de botella y asegura que todos los integrantes conozcan el estado exacto de cada entregable.',
      keyTechnologies: [
        { name: 'Flutter & Dart', category: 'Mobile' },
        { name: 'Firebase Cloud Firestore', category: 'Cloud & APIs' },
        { name: 'Firebase Authentication', category: 'Cloud & APIs' },
        { name: 'Laravel / PHP', category: 'Backend' },
        { name: 'Metodología Ágil Kanban', category: 'Metodología & Herramientas' },
        { name: 'GitHub Actions', category: 'Metodología & Herramientas' },
      ],
      architecturePatterns:
        'Patrón arquitectónico Modelo-Vista-Controlador (MVC) con separación clara entre las entidades del dominio, la UI reactiva de Flutter y los controladores de flujo. Integra el patrón Observer mediante Streams de Firestore para reflejar cambios concurrentes de forma inmediata, así como el patrón Command para gestionar transiciones de estado de tareas.',
      architecturalHighlights: [
        'Renderizado nativo a 60 FPS con Widgets optimizados para cambios de estado selectivos (Consumer/StreamBuilder).',
        'Actualizaciones de interfaz optimistas: los movimientos de tarjetas se reflejan al instante antes del ack en la nube.',
        'Reglas de seguridad granulares en Firestore para control de acceso por proyecto y equipo.',
        'Arquitectura modular extensible para adición de métricas de velocidad y gráficos de burndown.',
      ],
    },
    highlights: [
      'Tableros Kanban interactivos con columnas dinámicas y actualización optimista multi-dispositivo.',
      'Sincronización reactiva respaldada por Firestore Streams y reglas de seguridad granulares.',
      'Controladores desacoplados bajo patrón Observer para minimizar re-renders innecesarios.',
    ],
    codeSnippet: {
      filename: 'lib/controllers/board_stream_controller.dart',
      language: 'dart',
      code: `import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/task_model.dart';

class BoardStreamController {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Suscripción reactiva mediante patrón Observer
  Stream<List<TaskModel>> streamTasksByColumn(String boardId, String columnId) {
    return _firestore
        .collection('boards')
        .doc(boardId)
        .collection('tasks')
        .where('columnId', isEqualTo: columnId)
        .orderBy('updatedAt', descending: true)
        .snapshots()
        .map((snapshot) =>
            snapshot.docs.map((doc) => TaskModel.fromFirestore(doc)).toList());
  }

  Future<void> updateTaskStatus(String boardId, String taskId, String newColumnId) async {
    await _firestore
        .collection('boards')
        .doc(boardId)
        .collection('tasks')
        .doc(taskId)
        .update({
          'columnId': newColumnId,
          'updatedAt': FieldValue.serverTimestamp(),
        });
  }
}`,
    },
  },
  {
    id: 'mente-activa',
    slug: 'mente-activa-educativa',
    dotColor: 'outline',
    title: 'Mente Activa — App Móvil Educativa',
    shortDescription:
      'Aplicación móvil educativa desarrollada en Xamarin y C# con persistencia SQLite y minijuegos pedagógicos para niños.',
    fullDescription:
      'Aplicación móvil diseñada para combatir el rezago en habilidades matemáticas elementales y cálculo mental en infantes de nivel básico. Desarrollada en C# y Xamarin con arquitectura Offline-First y persistencia local en SQLite, transforma el tiempo recreativo frente a dispositivos móviles en sesiones de entrenamiento cognitivo mediante minijuegos de cálculo dinámico, registro de puntuaciones y retroalimentación inmediata.',
    architectureSummary:
      'Arquitectura Móvil bajo patrón Modelo-Vista-Controlador (MVC) y MVVM en C# / Xamarin. Cuenta con un motor Offline-First apoyado en SQLite para persistir perfiles de usuarios, niveles alcanzados y métricas de desempeño de forma completamente autónoma sin requerir conectividad de red.',
    tags: ['Xamarin', 'C# .NET', 'SQLite', 'MVC / MVVM', 'Kanban'],
    category: 'mobile',
    repoUrl: 'https://github.com/martinvillalobos/mente-activa',
    coverImage: '/proyectos/Mente Activa/Capturas/Interfaz-Juego-Suma-5.png',
    screenshots: [
      {
        url: '/proyectos/Mente Activa/Capturas/Interfaz-Juego-Suma-5.png',
        title: 'Minijuego de Cálculo Mental y Suma',
        caption: 'Interfaz interactiva de ejercicios matemáticos con selección dinámica de respuestas y temporizador.',
      },
      {
        url: '/proyectos/Mente Activa/Capturas/Interfaz-Menu-4.png',
        title: 'Menú Principal de Modalidades',
        caption: 'Panel visual amigable con acceso a categorías de actividades pedagógicas y desafíos.',
      },
      {
        url: '/proyectos/Mente Activa/Capturas/Interfaz-Inicio-3.png',
        title: 'Pantalla de Bienvenida Infantil',
        caption: 'Diseño accesible y estimulante concebido específicamente para la atención del público infantil.',
      },
      {
        url: '/proyectos/Mente Activa/Capturas/Interfaz-Inicio-Sesión-2.png',
        title: 'Autenticación Rápida de Alumno',
        caption: 'Acceso seguro y simplificado para niños con persistencia de sesión local.',
      },
      {
        url: '/proyectos/Mente Activa/Capturas/Interfaz-Registro-1.png',
        title: 'Registro de Nuevo Jugador',
        caption: 'Captura de datos de alumno y avatar para personalización de la experiencia.',
      },
      {
        url: '/proyectos/Mente Activa/Capturas/Interfaz-Perfil-6.png',
        title: 'Perfil de Rendimiento y Progreso',
        caption: 'Consulta de estadísticas, puntajes máximos alcanzados y medallas de superación.',
      },
    ],
    technicalDetails: {
      problemSolved:
        'Muchos estudiantes de nivel primaria dedican horas considerables al uso pasivo de smartphones sin contenidos formativos, manifestando dificultades en el cálculo mental básico, la concentración y la retención numérica. Mente Activa transforma ese hábito en un estímulo interactivo positivo mediante gamificación, permitiendo a los niños practicar sumas y agilidad matemática a su propio ritmo sin depender de conexión a internet.',
      keyTechnologies: [
        { name: 'C# .NET', category: 'Backend' },
        { name: 'Xamarin (Android / iOS)', category: 'Mobile' },
        { name: 'SQLite', category: 'Database / ETL' },
        { name: 'StarUML', category: 'Metodología & Herramientas' },
        { name: 'Metodología Kanban', category: 'Metodología & Herramientas' },
      ],
      architecturePatterns:
        'Arquitectura móvil desacoplada basada en MVC / MVVM. Separa las vistas XAML del motor lógico de juego y del repositorio de datos SQLite. Implementa un repositorio singleton para la base de datos local y un evaluador aritmético que genera reactivamente operandos y opciones trampa verosímiles.',
      architecturalHighlights: [
        'Estrategia 100% Offline-First: persistencia completa en SQLite local sin fallas por pérdida de señal o itinerancia.',
        'Motor matemático adaptativo que balancea dificultad conforme el jugador eleva su porcentaje de aciertos.',
        'Interfaz táctil de alto contraste y feedback visual instantáneo (acierto/error) para refuerzo positivo infantil.',
        'Ciclo de vida optimizado para evitar retención innecesaria de memoria en dispositivos móviles de gama media.',
      ],
    },
    highlights: [
      'Minijuegos matemáticos gamificados con evaluación en tiempo real y dificultad progresiva.',
      'Persistencia de perfiles, puntuaciones y medallas en SQLite con arquitectura Offline-First.',
      'Desarrollo nativo multiplataforma en C# / Xamarin siguiendo metodología de trabajo Kanban.',
    ],
    codeSnippet: {
      filename: 'MenteActiva/Services/MathGameService.cs',
      language: 'csharp',
      code: `using System;
using SQLite;
using System.Threading.Tasks;

public sealed class MathGameService {
    private readonly SQLiteAsyncConnection _db;

    public MathGameService(string dbPath) {
        _db = new SQLiteAsyncConnection(dbPath);
        _db.CreateTableAsync<UserScoreRecord>().Wait();
    }

    public MathChallenge GenerateSumChallenge(int currentLevel) {
        var random = new Random();
        int maxOperand = Math.Min(10 + (currentLevel * 5), 100);
        int a = random.Next(1, maxOperand);
        int b = random.Next(1, maxOperand);
        int correctResult = a + b;

        return new MathChallenge {
            Expression = $"{a} + {b} = ?",
            ExpectedAnswer = correctResult,
            OptionA = correctResult,
            OptionB = correctResult + random.Next(1, 4),
            OptionC = Math.Max(1, correctResult - random.Next(1, 4))
        };
    }

    public async Task SaveScoreAsync(int userId, int points, int streak) {
        await _db.InsertAsync(new UserScoreRecord {
            UserId = userId,
            Score = points,
            BestStreak = streak,
            CompletedAt = DateTime.UtcNow
        });
    }
}`,
    },
  },
  {
    id: 'merca-asia',
    slug: 'merca-asia-erp-ecommerce',
    dotColor: 'primary',
    title: 'Merca Asia — ERP & E-Commerce Omnicanal',
    shortDescription:
      'Sistema ERP y plataforma de comercio electrónico con sincronización de Shopify API, Facebook OAuth, YouTube y base de datos relacional MySQL.',
    fullDescription:
      'Sistema integral de gestión empresarial y tienda online para la empresa de importaciones Merca Asia / MerkaChina. Centraliza la administración de catálogo, órdenes de compra, control de inventario, proveedores y personal de ventas, integrando sincronización bidireccional con Shopify Admin API, autenticación federada mediante Facebook Graph API, campañas multimedia con YouTube Data API y reportes ejecutivos en AdminLTE.',
    architectureSummary:
      'Arquitectura Multicapa Orientada a Servicios (API-Driven Architecture). Integra un dashboard centralizado en AdminLTE desacoplado que interactúa con micro-servicios en PHP y pasarelas externas (Shopify REST API, Slim Framework v4, Facebook OAuth, YouTube API) mediante cURL, respaldado por un modelo relacional normalizado en MySQL.',
    tags: ['PHP 8', 'MySQL', 'Shopify API', 'Slim Framework', 'AdminLTE', 'OAuth'],
    category: 'backend',
    repoUrl: 'https://github.com/martinvillalobos/merca-asia',
    coverImage: '/proyectos/Merca Asia/capturas/3-Interfaz-Dashboard.png',
    screenshots: [
      {
        url: '/proyectos/Merca Asia/capturas/3-Interfaz-Dashboard.png',
        title: 'Dashboard Administrativo ERP',
        caption: 'Panel de control con métricas clave de pedidos, ventas acumuladas y accesos directos de inventario.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/4-Interfaz-Dasboard.png',
        title: 'Métricas de Ventas y Rendimiento',
        caption: 'Estadísticas de ingresos, volumen de pedidos y gráficos comparativos de actividad.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/1-Interfaz-Inicio.png',
        title: 'Catálogo de la Tienda Online',
        caption: 'Portal de cara al cliente con productos destacados, promociones y categorías de mercancía.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/5-Interfaz-Productos.png',
        title: 'Gestión y Stock de Productos',
        caption: 'Listado administrativo de existencias, precios de compra/venta y control de variantes.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/7-Interfaz-Crear-Producto.png',
        title: 'Alta y Sincronización con Shopify',
        caption: 'Formulario de registro de producto con envío automático al catálogo de Shopify vía API.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/8-Interfaz-Gestion-de-Pedidos.png',
        title: 'Control de Pedidos y Envíos',
        caption: 'Administración de órdenes omnicanal recibidas desde la tienda física y la plataforma digital.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/6-Interfaz-Imprimir-Productos.png',
        title: 'Módulo de Impresión de Reportes',
        caption: 'Generación de fichas técnicas e impresión de inventarios listos para almacén.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/9-Interfaz-Videos Publicidad.png',
        title: 'Integración Multimedia YouTube',
        caption: 'Consumo dinámico de la YouTube Data API para reproducción de material publicitario corporativo.',
      },
      {
        url: '/proyectos/Merca Asia/capturas/2-Interfaz-Registro.png',
        title: 'Portal de Clientes y Login Social',
        caption: 'Registro de compradores con soporte de autenticación tradicional y Facebook OAuth.',
      },
    ],
    technicalDetails: {
      problemSolved:
        'Merca Asia enfrentaba dispersión operativa: las ventas en tienda física, el control de inventario de almacén y las ventas online en Shopify operaban en silos desconectados, provocando descuadres de stock, errores en el surtido de pedidos y falta de métricas consolidadas. El sistema unifica la base de datos de personas, proveedores, empleados y productos con sincronización en tiempo real hacia Shopify y APIs publicitarias.',
      keyTechnologies: [
        { name: 'PHP 8+', category: 'Backend' },
        { name: 'MySQL Relacional', category: 'Database / ETL' },
        { name: 'Shopify Admin REST API', category: 'Cloud & APIs' },
        { name: 'Slim Framework v4', category: 'Backend' },
        { name: 'Facebook Graph API (OAuth)', category: 'Cloud & APIs' },
        { name: 'YouTube Data API v3', category: 'Cloud & APIs' },
        { name: 'AdminLTE 3 (Bootstrap 4)', category: 'Frontend' },
      ],
      architecturePatterns:
        'Arquitectura en Tres Capas basada en APIs (Service-Oriented / API-Driven). La capa de presentación (AdminLTE) se conecta con controladores en PHP y micro-controladores Slim Framework que gestionan llamadas HTTP/cURL hacia la API de Shopify. La persistencia en MySQL utiliza un esquema normalizado con relaciones entre `persona`, `cliente`, `proveedor`, `producto` y `venta`.',
      architecturalHighlights: [
        'Sincronización automatizada con la API REST de Shopify para alta de productos y recuperación de pedidos en JSON.',
        'Módulo de autenticación social con Facebook SDK OAuth para acelerar el registro y retención de compradores.',
        'Modelo relacional MySQL con integridad referencial estricta, claves foráneas y normalización de compras y ventas.',
        'Mapeo dinámico de campañas de video promocionales mediante consultas a la YouTube Data API v3.',
      ],
    },
    highlights: [
      'Sincronización bidireccional con Shopify Admin API para catálogos y órdenes de compra.',
      'Arquitectura modular en PHP conectada con Facebook Graph API y YouTube Data API.',
      'Control de inventario empresarial y roles de usuario para personal de ventas y clientes.',
    ],
    codeSnippet: {
      filename: 'apis/shopify/control_pedido.php',
      language: 'php',
      code: `<?php
declare(strict_types=1);

namespace MercaAsia\\Integrations\\Shopify;

final class ShopifyOrderGateway {

    public function callApi(string $method, string $endpoint, ?array $payload = null): array {
        $url = "https://{$this->shopDomain}/admin/api/{$this->apiVersion}/{$endpoint}";
        $ch = curl_init($url);
        
        $headers = [
            "Content-Type: application/json; charset=utf-8"
        ];
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        if ($method === 'POST' && $payload) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }

        $rawResponse = curl_exec($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            'status' => $statusCode,
            'data' => json_decode((string)$rawResponse, true)
        ];
    }
}`,
    },
  },
  {
    id: 'new-style',
    slug: 'new-style-virtual-wardrobe',
    dotColor: 'tertiary',
    title: 'New Style — Outfits & Guardarropa Virtual',
    shortDescription:
      'Plataforma web para creación, visualización interactiva y guardado de combinaciones de prendas de vestir personalizadas.',
    fullDescription:
      'Aplicación web concebida para mitigar el consumo impulsivo y optimizar la toma de decisiones al vestir. Desarrollada por el equipo estudiantil Mind Byte, New Style proporciona a los usuarios un probador y guardarropa virtual interactivo con carrusel de prendas en JavaScript, vinculación a tiendas de ropa y almacenamiento seguro de conjuntos favoritos en base de datos MySQL.',
    architectureSummary:
      'Arquitectura Web Cliente-Servidor clásica de tres capas. Frontend interactivo construido con HTML5 semántico, CSS3 y JavaScript para la manipulación dinámica del probador; servidor backend en PHP para la gestión de sesiones y endpoints de guardado; y base de datos relacional en MySQL para usuarios y colecciones de prendas.',
    tags: ['JavaScript', 'PHP', 'MySQL', 'HTML5 / CSS3', 'XAMPP'],
    category: 'backend',
    repoUrl: 'https://github.com/martinvillalobos/new-style',
    coverImage: '/proyectos/NewStyle/Capturas/Interfaz-Combinaciones-5.png',
    screenshots: [
      {
        url: '/proyectos/NewStyle/Capturas/Interfaz-Combinaciones-5.png',
        title: 'Probador Virtual y Combinaciones Guardadas',
        caption: 'Módulo interactivo para mezclar tops, pantalones, vestidos y calzado, guardando outfits preferidos.',
      },
      {
        url: '/proyectos/NewStyle/Capturas/Interfaz-Principal-3.png',
        title: 'Página de Inicio y Tendencias',
        caption: 'Presentación de colecciones de moda, categorías principales y llamados a la acción.',
      },
      {
        url: '/proyectos/NewStyle/Capturas/Interfaz-Ropa-4.png',
        title: 'Catálogo de Prendas y Filtros',
        caption: 'Exploración de artículos con especificaciones de estilo, ocasión y precio de referencia.',
      },
      {
        url: '/proyectos/NewStyle/Capturas/Interfaz-Inicio-Sesion-1.png',
        title: 'Acceso a la Cuenta de Usuario',
        caption: 'Inicio de sesión seguro para recuperación del guardarropa personal y conjuntos guardados.',
      },
      {
        url: '/proyectos/NewStyle/Capturas/Interfaz-Registro-2.png',
        title: 'Registro de Nuevos Miembros',
        caption: 'Formulario de registro con validaciones de campos y creación de perfil en base de datos.',
      },
    ],
    technicalDetails: {
      problemSolved:
        'El alto consumismo en la industria de la moda genera gastos innecesarios e impacto ambiental por prendas subutilizadas, sumado a la frustración cotidiana al intentar coordinar conjuntos para diversas ocasiones. New Style permite a los usuarios planificar atuendos antes de comprar, visualizar cómo combinan las prendas existentes con nuevas adquisiciones y guardar combinaciones para cualquier evento.',
      keyTechnologies: [
        { name: 'JavaScript Vanilla', category: 'Frontend' },
        { name: 'HTML5 Semántico & CSS3', category: 'Frontend' },
        { name: 'PHP Backend', category: 'Backend' },
        { name: 'MySQL Relacional', category: 'Database / ETL' },
        { name: 'Servidor Apache / XAMPP', category: 'Metodología & Herramientas' },
        { name: 'Diseño Entidad-Relación', category: 'Metodología & Herramientas' },
      ],
      architecturePatterns:
        'Arquitectura Cliente-Servidor de 3 capas. El cliente ejecuta scripts en JavaScript para el carrusel de prendas y la composición de atuendos en tiempo real en el DOM; la capa intermedia en PHP procesa peticiones HTTP, controla sesiones de usuario y valida datos; y la capa de almacenamiento en MySQL asegura la integridad de los conjuntos guardados.',
      architecturalHighlights: [
        'Probador dinámico en JavaScript que actualiza y empareja prendas sin requerir recargas de página.',
        'Base de datos relacional con diagramación Entidad-Relación estructurada y diccionario de datos documentado.',
        'Gestión de sesiones de usuario con protección de credenciales y almacenamiento de atuendos favoritos.',
        'Diseño responsive adaptado tanto para navegación de escritorio como para visualización en dispositivos móviles.',
      ],
    },
    highlights: [
      'Probador virtual de ropa interactivo con guardado de atuendos personalizados en base de datos.',
      'Catálogo categorizado de prendas con vinculación a compras inteligentes y sostenibles.',
      'Arquitectura web de 3 capas (JavaScript, PHP, MySQL) con control de sesiones de usuario.',
    ],
    codeSnippet: {
      filename: 'assets/js/outfitMixer.js',
      language: 'javascript',
      code: `// Controlador del Probador Virtual de New Style
class OutfitMixer {
  constructor({ topCarousel, bottomCarousel, saveButton }) {
    this.tops = ['blusa_casual.png', 'top_formal.png', 'sueter_lana.png'];
    this.bottoms = ['pantalon_palazzo.png', 'falda_midi.png', 'jeans_recto.png'];
    this.currentTopIndex = 0;
    this.currentBottomIndex = 0;
  }

  cycleTop(direction = 1) {
    this.currentTopIndex = (this.currentTopIndex + direction + this.tops.length) % this.tops.length;
    this.updatePreview();
  }

  cycleBottom(direction = 1) {
    this.currentBottomIndex = (this.currentBottomIndex + direction + this.bottoms.length) % this.bottoms.length;
    this.updatePreview();
  }

  async saveCurrentOutfit(userId) {
    const payload = {
      user_id: userId,
      top_id: this.tops[this.currentTopIndex],
      bottom_id: this.bottoms[this.currentBottomIndex],
      created_at: new Date().toISOString()
    };
    
    const response = await fetch('api/guardar_conjunto.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.json();
  }
}`,
    },
  },
];

export const DEVELOPER_PROFILE = {
  name: 'Martín Villalobos',
  devId: 'DEV_ID // 084',
  status: 'ONLINE',
  role: 'Software Engineer',
  headline: 'Estudiante de Ing. Desarrollo de Software',
  subtitle:
    'Estudiante de Ingeniería en Software construyendo soluciones desde el backend hasta el dispositivo móvil.',
  email: 'nunezmartin822@gmail.com',
  githubUrl: 'https://github.com/MartinVN0210',
  stackSummary: 'STACK: WEB & MOBILE',
  expYear: 'EXP: 2026',
  aboutText:
    'Soy un ingeniero en desarrollo de software multiplataforma con un fuerte interés en crear soluciones tecnológicas útiles, accesibles y bien estructuradas. Me gusta trabajar en proyectos que representen un reto, donde pueda aplicar la lógica, la creatividad y buenas prácticas de desarrollo. Tengo experiencia desarrollando aplicaciones tanto web como móviles, y disfruto aprender constantemente para mantenerme actualizado con las tendencias y metodologías del sector. Actualmente estoy enfocado en seguir creciendo profesionalmente, explorando nuevas áreas como AI y el desarrollo frontend moderno.',
  education: {
    degree: 'Ingeniería en Software',
    period: '2021 — 2025 (En curso • Estadías Profesionales)',
    focus: 'Arquitectura de Sistemas, Desarrollo Móvil, Ingeniería de Datos y Machine Learning Aplicado',
  },
  skillCategories: [
    {
      title: 'Backend & Sistemas',
      items: ['PHP 8+ / Slim', 'Laravel & Node.js', 'APIs RESTful & OAuth', 'PostgreSQL / MySQL / SQLite', 'ETL Pentaho PDI'],
    },
    {
      title: 'Desarrollo Móvil',
      items: ['Flutter & Dart', 'Xamarin / C# .NET', 'Arquitectura MVC & MVVM', 'Persistencia Offline SQLite', 'Firebase & Firestore Streams'],
    },
    {
      title: 'Datos & Machine Learning',
      items: ['Data Warehouse Star Schema', 'Scikit-Learn & Python', 'Power BI Dashboards', 'Ingeniería de Características', 'Series Temporales'],
    },
  ],
};
