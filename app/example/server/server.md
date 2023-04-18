# Archivo de Configuración del Servidor
<h3>Aquí se encuentra la configuración del servidor, que incluye la configuración de tickets y embeds.
<h3>

## **Tickets**
```yaml

tickets:
  server: '1084686651898478612'
  nombre: 'Yoquer_Shop'
  category: 'Ticket'
  transcripts: '1086160369233444875'
  staff: 
  - "1084695527544856688"
```
<h3>La configuración de tickets permite personalizar cómo se crean y gestionan los tickets en el servidor. Los siguientes parámetros están disponibles:<h3>

•**server**: El ID del servidor en el que se crearán los tickets.

•**nombre**: El nombre del ticket. Puedes usar placeholders (marcadores de posición) como **%user_tag%**, **%user_id%**, **%username%** para generar nombres dinámicos basados en la información del usuario. Por ejemplo, 'ticket-%user_id%' se convertirá en 'ticket-1234234233'.

•**category**: El ID de la categoría en la que se crearán los tickets.

•**transcripts**: El ID del canal en el que se guardarán las transcripciones de los tickets.

•**staff**: Una lista de IDs de roles de staff que tendrán acceso a los tickets.

## **Embeds**
```yaml
embed:
  ticket:
    title: "If you need any assistance click on the button corresponding to the type of ticket you wish to open. Si necesita ayuda, haga clic en el botón correspondiente al tipo de boleto que desea abrir"
    description: "Un staff te responderé en breve/A staff will answer you shortly"
  panel:
    title: "Yoquer_SHOP"
    description: "Un staff te responderé en breve/A staff will answer you shortly"
    color: ''
```
<h3>La configuración de embeds permite personalizar cómo se muestran los mensajes de ticket y panel. Puedes establecer los siguientes parámetros:<h3>

•**ticket**: Configuración del embed para los mensajes de tickets, que incluye el título y descripción del embed.

•**panel**: Configuración del embed para los mensajes de panel, que incluye el título, descripción y color del embed.

<h3>Estos son los principales ajustes de configuración del servidor para personalizar el comportamiento y apariencia de los tickets y embeds. Asegúrate de configurarlos correctamente de acuerdo a tus necesidades antes de utilizar el sistema de tickets en tu servidor. ¡Disfruta de una mejor gestión de tickets con esta configuración!<h3>