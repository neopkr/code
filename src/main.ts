import { app } from 'electron';
import { RequestListener, RequestListenerOnReady } from './Listener/RequestListener';
import { CreateWindow } from './Window/Window';
import { NotificationsType, spawnNotificationLogger } from './Notifications/Notifications';

RequestListener();

app.on('ready', async () => {
    const _window = CreateWindow();
    await RequestListenerOnReady(_window);
    spawnNotificationLogger(_window, NotificationsType.Info, "Listener: Requesting called, starting loader js.")
})
