import Vue from 'vue'
import LoadingComponent from './loading.vue'


const LoadingConstructor = Vue.extend(LoadingComponent)

Vue.directive('loading', {
    bind(el, binding) {
        const instance = new LoadingConstructor({
            el: document.createElement('div'),
            data: {}
        })
        el.appendChild(instance.$el)
        el.instance = instance
        Vue.nextTick(() => {
            el.instance.visible = binding.value
        })
    },
    update(el, binding) {
        if (binding.oldValue !== binding.value) {
            el.instance.visible = binding.value
        }
    },
    unbind(el) {
        const mask = el.instance.$el
        if (mask.parentNode) {
            mask.parentNode.removeChild(mask)
        }
        el.instance.$destroy()
        el.instance = undefined
    }
})

let loading = undefined

LoadingConstructor.prototype.close = function() {
    if (loading) {
        loading = undefined
    }
    this.visible = false
    setTimeout(() => {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$destroy()
    }, 300)
}

const Loading = (options = {}) => {
    if (loading) {
        return loading
    }
    const parent = document.body
    const opts = {
        text: '',
        ...options
    }
    const instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: opts
    })
    parent.appendChild(instance.$el)
    Vue.nextTick(() => {
        instance.visible = true
    })
    loading = instance
    return instance
}

Vue.prototype.$loading = Loading

export default Loading


