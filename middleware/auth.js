export default function ({ store, redirect, isClient}) {
    if (isClient && !store.getters.isAuthenticated) {
        return redirect('login')
    }
}
