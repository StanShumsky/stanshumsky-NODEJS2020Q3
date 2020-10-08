import { App } from './app/app';
import { environment } from './environments/environment';

const app = new App();

app
  .start()
  .then(() => console.log(`App is running on http://localhost:${environment.PORT}`))
  .catch((error: Error) => console.error('Error:', error.message));
