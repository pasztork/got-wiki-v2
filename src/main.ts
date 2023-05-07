import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { GoTWikiAppModule } from './app/got-wiki-app.module';


platformBrowserDynamic().bootstrapModule(GoTWikiAppModule)
  .catch(err => console.error(err));
