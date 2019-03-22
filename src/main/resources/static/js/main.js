var linkApi = Vue.resource('/link')

Vue.component('link-form', {
    props: ['links'],
    data: function() {
        return {
            text: ''
        }
    },
    template:
        '<div>' +
        '<input type="text" placeholder="Write a link" v-model="text"/>' +
        '<input type="button" value="Analyze" @click="analyze"/>' +
        '</div>',
    methods: {
        analyze: function() {
            this.links.splice(0);
            var url = {url: this.text};
            linkApi.save({}, url).then(result =>
                result.json().then(data => {
                data.forEach(link => this.links.push(link))
            })
        )
         this.text = ''
        }
    }
    });

Vue.component('links-clear', {
    props: ['links'],
    template:
        '<div>' +
        '<input type="button" value="Clear" @click="clear"/>' +
        '</div>',
    methods: {
        clear: function () {
            this.links.splice(0);
        }
    }
})

Vue.component('link-row', {
    props: ['link'],
    template: '<div><i>{{ link.id }}</i> {{ link.name }} <a :href="link.url">{{ link.url }}</a></div>'
});

Vue.component('links-list', {
    props: ['links'],
    template:
        '<div>' +
        '<link-row v-for="link in links" :key="link.id" :link="link"/>' +
        '</div>'
})

var app = new Vue({
    el: '#app',
    template: '<div><link-form :links="links" />' +
              '<links-list :links="links"/>' +
               '<links-clear :links="links"/>' +
                '</div>',
    data: {
        links: []
    }
});