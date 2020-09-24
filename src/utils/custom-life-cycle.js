import Vue from 'vue'

const notifyVisibilityChange = (lifeCycleName, vm) => {
    const lifeCycles = vm.$options[lifeCycleName]
    if (lifeCycles && lifeCycles.length ) {
        lifeCycles.forEach(lifecycle => {
            lifecycle.call(vm)
        })
    }
    if (vm.$children && vm.$children.length) {
        vm.$children.forEach(child => {
            notifyVisibilityChange(lifeCycleName, child)
        })
    }
}

export function init() {
    const optionMergeStrategies = Vue.config.optionMergeStrategies
    optionMergeStrategies.pageVisible = optionMergeStrategies.created
    optionMergeStrategies.pageHidden = optionMergeStrategies.created
}

export function bind(rootVm) {
    window.addEventListener('visibilitychange', () => {
        let lifeCycleName = undefined
        if (document.visibilityState === 'hidden') {
            lifeCycleName = 'pageHidden'
        } else if(document.visibilityState === 'visible') {
            lifeCycleName = 'pageVisible'
        }

        if (lifeCycleName) {
            notifyVisibilityChange(lifeCycleName, rootVm)
        }
    })
}

