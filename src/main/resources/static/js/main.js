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
    template: '<tr>' +
                    '<td>{{link.id}}</td>' +
                    '<td>{{link.name}}</td>' +
                    '<td>{{link.url}}</td>' +
              '</tr>'
});

Vue.component('links-list', {
    props: ['links'],
    template: '<table>' +
                    '<thead>' +
                        '<th colspan="3">Found links</th>' +
                    '</thead>' +
                    '<thead>' +
                        '<th>ID</th>' +
                        '<th>Name</th>' +
                        '<th>URL</th>' +
                    '</thead>' +
                    '<tbody>' +
                        '<tr is="link-row" v-for="link in links" :key="link.id" :link="link"></tr>' +
                    '</tbody>' +
              '</table>'

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