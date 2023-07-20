import './styles/main.scss';
import { getMenu, getCurrentPage } from './Router';
import * as PageShark from './pages/PageShark';

document.querySelector<HTMLDivElement>('#app')!.innerHTML =/* html */`
<header>
	<h1>Info Site</h1>
	${getMenu()}
</header>
<main>
	${getCurrentPage()}
</main>
`;

/* attachSharkEvents(); */

PageShark.attachEvents