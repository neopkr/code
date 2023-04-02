import { app } from 'electron';
import { RequestListener, RequestListenerOnReady } from './Listener/RequestListener';
import { CreateWindow } from './Window/Window';

RequestListener();

app.on('ready', async () => {
    const _window = CreateWindow();
    await RequestListenerOnReady(_window);
})
