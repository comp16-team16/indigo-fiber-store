class Store {

    constructor(initialState, mutations, actions) {

        this.listeners = {}
        this.state = {...initialState}
        this.mutations = mutations
        this.actions = actions
    }


    getStateClone() {
        return {...this.state}
    }


    subscribe(mutationName, listener) {

        if (! this.listeners.hasOwnProperty(mutationName)) {
            this.listeners[mutationName] = []
        }

        this.listeners[mutationName].push(listener)
    }


    notify(mutationName) {
        this.listeners[mutationName]?.forEach(listener =>
            listener(this.getStateClone())
        )
    }


    commit(mutationName, ...mutationArgs) {

        if (this.mutations.hasOwnProperty(mutationName)) {

            const mutate = this.mutations[mutationName]
            const stateClone = this.getStateClone()

            mutate(stateClone, ...mutationArgs)

            this.state = stateClone
            this.notify(mutationName)
        }
    }


    dispatch(actionName, ...actionArgs) {

        if (this.actions.hasOwnProperty(actionName)) {

            const action = this.actions[actionName]
            action(this, ...actionArgs)
        }
    }
}


export default function createStore({ state, mutations, actions }) {

    return new Store(
        state,
        mutations,
        actions
    )
}
