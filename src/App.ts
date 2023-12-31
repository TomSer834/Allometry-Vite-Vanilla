import './styles/main.scss';
import { getMenu, getCurrentPage } from './Router';
import * as PageShark from './pages/PageShark';

document.querySelector<HTMLDivElement>('#app')!.innerHTML =/* html */`
<header>
	<h1>THE CRAZY SITE</h1>
	<div class="thin-line"></div>
	${getMenu()}
	<div class="thin-line"></div>
</header>
<main>
	${getCurrentPage()}
</main>
`;

/* attachSharkEvents(); */

PageShark.attachEvents();