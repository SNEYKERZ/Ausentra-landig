# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Compradores:** dueños de pyme, gerentes y responsables de RR. HH. en Colombia (y LatAm) que hoy llevan ausencias y vacaciones en Excel, correo o WhatsApp y evalúan una herramienta para tener control del equipo.
- **Usuarios finales de la app (no del landing):** administradores de RR. HH., jefes que aprueban y colaboradores que solicitan ausencias.

## Product Purpose

Ausentra (nombre interno del proyecto: *Admin Calendar*) es un SaaS multiempresa de gestión de ausencias. Responde en segundos quién está ausente hoy, quién se ausentará pronto, quién tiene vacaciones por vencer y qué solicitudes esperan aprobación. El landing existe para vender licencias por plan.

## Positioning

Un solo calendario del equipo como centro: las ausencias se registran arrastrando sobre los días, con aprobaciones, saldos de vacaciones, bloqueos operacionales y documentos firmables alrededor. Hecho para la realidad laboral colombiana (festivos oficiales, precios en COP).

## Operating Context

El comprador llega desde búsqueda o referido, compara planes y decide comprar o hablar con ventas. **No existe demo pública, prueba gratuita ni video**: el landing debe convencer con vistas del producto y descripción clara.

## Capabilities and Constraints

Módulos confirmados en la app (`../admincalendar/resources/js/pages`):

- **Inicio (dashboard):** disponibilidad del equipo, aprobaciones pendientes, saldos de vacaciones, ausencia actual / próxima ausencia, días que vencen en los próximos 90 días.
- **Calendario:** ausencias y novedades del equipo; arrastrar sobre los días para registrar; filtros y leyenda de colores por tipo; festivos.
- **Aprobaciones:** aprobar o rechazar con motivo del rechazo; validación de bloqueo operacional.
- **Solicitudes** del colaborador (crear, ver estado).
- **Comunidad:** directorio interno con la disponibilidad de cada persona hoy, filtrable por área.
- **Usuarios y vacaciones, Áreas, Tipos de ausencia** configurables, **Empresa**.
- **Documentos:** consultar, descargar y firmar documentos laborales (pendientes de firma / firmados / rechazados).
- **Horas extra:** registro personal y del equipo.
- **Reportes:** por persona o área, exportación a CSV.
- **Seguridad:** autenticación con 2FA; arquitectura multiempresa (tenants).

Restricciones: no prometer exportación a Excel/PDF, integraciones, API pública ni notificaciones en tiempo real mientras no estén confirmadas. Planes y precios vienen de `public/api/plans.json` (Básico, Profesional, Empresarial; COP/USD). Pago vía Stripe / Mercado Pago.

## Brand Commitments

- Nombre público: **Ausentra**. Logo en `../admincalendar/public/ausentra-logo.png`.
- La app modernizada usa acento índigo único, estados semánticos (aprobado/pendiente/rechazado) y tipografía Instrument Sans; el landing debe sentirse de la misma familia.
- Idioma: español neutro con tuteo.

## Evidence on Hand

- Sin testimonios, logos de clientes, métricas de uso ni casos de éxito: **no inventarlos**.
- Sin capturas reales: las vistas del producto se muestran como mockups en código fieles a la app.
- Datos de contacto actuales (email, teléfono, dirección, horario) son de relleno y deben marcarse para reemplazo.

## Product Principles

1. Claridad antes que promesa: mostrar el producto, no adjetivos.
2. Honestidad comercial: nada de demos, pruebas o cifras que no existen.
3. El calendario es el héroe: todo se explica desde “quién está y quién no”.
4. Hecho para Colombia, usable en LatAm.
