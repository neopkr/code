import { app } from 'electron';
import { RequestListener, RequestListenerOnReady } from './Listener/RequestListener';
import { CreateWindow } from './Window/Window';

RequestListener();

app.on('ready', () => {
    const _window = CreateWindow();
    RequestListenerOnReady(_window);
})
