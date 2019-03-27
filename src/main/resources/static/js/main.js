var linkApi = Vue.resource('/link')

Vue.component('link-form', {
    props: ['links'],
    data: function() {
        return {
            text: '',
            preloaderVisibility: false
        }
    },
    template:
        '<div>' +
        '<div><h3>Analyzing page</h3></div>' +
        '<div><input id="edit"style="width: 100%" type="text" placeholder="Write a link" v-model="text"/></div>' +
        '<div class="center"><button style="width:200px;" title="Analyze" @click="analyze">Analyze</button></div>' +
        '<div v-if="preloaderVisibility" id="image" class="center"><img style="width:200px;" src="/img/wait.gif"></div>' +
        '</div>',
    methods: {
        analyze: function() {
            var url = {url: document.querySelector('#edit').value};
            var temp = "https?:\/\/[a-z0-9\-\.]+\.[a-z]{2,9}";
            var regex = new RegExp(temp);
            if (!regex.test(document.querySelector('#edit').value) || url.url.length==0) {
                alert("Incorrect url!")
                return false;
            }
            this.links.splice(0);
            this.preloaderVisibility = true;
            linkApi.save({}, url).then(result =>
                result.json().then(data => {
                data.forEach(link => this.links.push(link))
            })
        )
         this.text = '';
        }
    }
    });

Vue.component('links-clear', {
    props: ['links'],
    template:
        '<div class="center">' +
        '<input type="button" style="width:200px;" value="Clear" @click="clear"/>' +
        '</div>',
    methods: {
        clear: function () {
            this.links.splice(0);
        }
    }
});

Vue.component('link-row', {
    props: ['link'],
    template: '<tr>' +
                    '<td>{{link.id}}</td>' +
                    '<td>{{link.name}}</td>' +
                    '<td onclick="document.querySelector(\'#edit\').value = this.textContent" style="cursor: pointer">{{link.url}}</td>' +
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
});

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
