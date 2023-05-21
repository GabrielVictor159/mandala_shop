import { NavigatePages } from "../model/NavigatePages";

export default function HistoryPagesSet(history: NavigatePages[], page: NavigatePages): NavigatePages[] {
    if (history.length === 0) {
        history.push(page);
    }
    else if (history.length <= 2) {
        if (history[history.length - 1].nome !== page.nome) {
            history.push(page);
        }

    }
    else {
        if (history[history.length - 2].nome === page.nome) {
            history.pop();
            return history;
        }
        else if (history[history.length - 1].nome !== page.nome) {
            history.push(page);
        }
    }
    if (history.length > 6) {
        history.splice(0, history.length - 6);
    }
    return history;
}