// Escape HTML
export function escapeHtml(unsafe) {
    if (!unsafe) {
        return
    } else {
        return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
    }
}
