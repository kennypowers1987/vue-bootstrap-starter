<template id="pdfs">
  <div>
    <b-jumbotron header="PDFs" lead="Example PDF Components for Vue.js 2" v-bind:text-variant="theme"></b-jumbotron>
    <div id="pdf-container" class="container">
      <b-button class="document-selector" v-for="document of documents" @click="updatePDF(document.url)"
                :key="document.title" :variant="theme">View {{document.title}} PDF Example
      </b-button>
      <div class="display-right">
        <p class="display-right">Page {{this.page}} of {{this.numPages}}</p>
        <b-button-group>
          <b-button @click=rotateLeft :variant="theme">&#10226;</b-button>
          <b-button @click=rotateRight :variant="theme">&#10227;</b-button>
        </b-button-group>
        <b-button-group>
          <b-button @click=previousPage :variant="theme">&#129092</b-button>
          <b-button @click=nextPage :variant="theme">&#129094</b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import VueLocalStorage from "vue-localstorage"
  import pdfjsLib from "pdfjs-dist"

  Vue.use(VueLocalStorage)
  let currentPDF = undefined
  export default {
    name: "pdfs",
    data() {
      return {
        theme: Vue.localStorage.get("theme"),
        page: 0,
        numPages: 0,
        rotation: 0,
        zoom: 0,
        documents: [{
          url: './src/assets/studyguide.pdf',
          title: 'Study Guide'
        }, {
          url: './src/assets/ricepaddies.pdf',
          title: 'Rice Paddies'
        }]
      }
    },

    created() {
      this.$bus.$on("theme-changed", $event => {
        this.updateTheme()
      })
    },

    mounted() {
      this.updatePDF('./src/assets/studyguide.pdf')
    },

    methods: {
      rotateLeft() {
        this.rotation -= 90
        this.renderPage(this.page)
      },
      rotateRight() {
        this.rotation += 90
        this.renderPage(this.page)
      },
      previousPage() {
        if (this.page > 1) {
          this.page--
          this.renderPage(this.page)
        }
      },
      nextPage() {
        if (this.page < this.numPages) {
          this.page++
          this.renderPage(this.page)
        }
      },
      updateTheme() {
        this.theme = Vue.localStorage.get("theme")
        console.log("updating theme to : " + this.theme)
      },
      renderPage(num) {
        const vm = this
        this.page = num
        currentPDF.getPage(num).then(function (page) {
          const scale = 2
          const viewport = page.getViewport(scale, vm.rotation)

          // Prepare canvas using PDF page dimensions
          // const canvas = document.getElementById('the-canvas')
          let canvas = document.getElementById("the-canvas")
          if (!canvas) {
            canvas = document.createElement("canvas")
            canvas.id = "the-canvas"
            canvas.setAttribute("style", "height: 100%; width: 100%;")
          }
          document.getElementById("pdf-container").appendChild(canvas)
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width

          // Render PDF page into canvas context
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          }

          const renderTask = page.render(renderContext)
          renderTask.then(function () {
            // Page rendered
          })
        })
      },
      updatePDF(url) {
        this.rotation = 0
        const vm = this
        const loadingTask = pdfjsLib.getDocument(url)
        loadingTask.promise.then(function (pdf) {
          currentPDF = pdf
          const pageNumber = 1
          vm.page = pageNumber
          vm.numPages = pdf.pdfInfo.numPages
          vm.renderPage(pageNumber)
        }, function (reason) {
          // PDF loading error
          console.error(reason)
        })
      }
    }
  }
</script>

<style>
  .document-selector {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .display-right {
    text-align: right
  }
</style>
