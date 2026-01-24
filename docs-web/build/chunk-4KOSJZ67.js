import{a as o,b as l,c as m,d,e as s,f as i,g as r}from"./chunk-CDTJAOIR.js";var t=class extends d{constructor(){super(...arguments);this.githubUrl="https://github.com/vollowx/seele";this.rtl=!1;this.themeMode="auto";this.tooltipTexts={rtl:["Set direction to right-to-left","Set direction to left-to-right"]};this._handleSystemThemeChange=()=>{this.themeMode==="auto"&&this._applyTheme()}}connectedCallback(){super.connectedCallback(),this._initializeDir(),this._loadThemePreference(),this._setupThemeListener(),this._applyTheme()}disconnectedCallback(){super.disconnectedCallback(),this._prefersDarkQuery&&this._prefersDarkQuery.removeEventListener("change",this._handleSystemThemeChange)}_initializeDir(){document.documentElement.dir=this.rtl?"rtl":"ltr"}_loadThemePreference(){let e=localStorage.getItem("sw-theme-preference");(e==="light"||e==="dark"||e==="auto")&&(this.themeMode=e)}_saveThemePreference(){localStorage.setItem("sw-theme-preference",this.themeMode)}_setupThemeListener(){this._prefersDarkQuery=window.matchMedia("(prefers-color-scheme: dark)"),this._prefersDarkQuery.addEventListener("change",this._handleSystemThemeChange)}_applyTheme(){if(this.themeMode==="auto"){let e=this._prefersDarkQuery?.matches??window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.mdTheme=e?"dark":"light"}else document.documentElement.dataset.mdTheme=this.themeMode}_getTooltipText(e,a){return this.tooltipTexts[e][a?1:0]}_toggleThemeMenu(){let e=this.shadowRoot?.querySelector("#theme-menu");e&&(e.open=!e.open)}_handleThemeSelect(e){let n=e.detail.item.dataset.theme;n&&(this.themeMode=n,this._applyTheme(),this._saveThemePreference())}_handleDir(e){this.rtl=e.detail,document.documentElement.dir=this.rtl?"rtl":"ltr"}_handleScrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}_handleGithubClick(){window.open(this.githubUrl,"_blank")}render(){return m`
      <md-menu
        id="theme-menu"
        for="action-toggle-theme"
        offset="16"
        align="top"
        alignStrategy="fixed"
        @select=${this._handleThemeSelect}
      >
        <md-menu-item data-theme="light" ?selected=${this.themeMode==="light"}>
          Light
        </md-menu-item>
        <md-menu-item data-theme="dark" ?selected=${this.themeMode==="dark"}>
          Dark
        </md-menu-item>
        <md-menu-item data-theme="auto" ?selected=${this.themeMode==="auto"}>
          Device Default
        </md-menu-item>
      </md-menu>

      <md-toolbar type="floating" color="vibrant">
        <md-icon-button
          id="action-open-repo"
          aria-label="GitHub repository"
          @click=${this._handleGithubClick}
        >
          <md-icon>code_blocks</md-icon>
        </md-icon-button>
        <md-tooltip for="action-open-repo" offset="16">View source code</md-tooltip>

        <md-icon-button-toggle
          id="action-toggle-direction"
          variant="tonal"
          ?checked=${this.rtl}
          @change=${this._handleDir}
        >
          <md-icon aria-label="Set direction to RTL">
            format_textdirection_r_to_l
          </md-icon>
          <md-icon slot="checked" aria-label="Set direction to LTR">
            format_textdirection_l_to_r
          </md-icon>
        </md-icon-button-toggle>
        <md-tooltip for="action-toggle-direction" offset="16">
          ${this._getTooltipText("rtl",this.rtl)}
        </md-tooltip>

        <md-icon-button
          id="action-toggle-theme"
          @click=${this._toggleThemeMenu}
        >
          <md-icon aria-label="Change theme">palette</md-icon>
        </md-icon-button>
        <md-tooltip for="action-toggle-theme" offset="16">
          Change theme
        </md-tooltip>

        <md-fab
          slot="fab"
          color="tertiary"
          id="scroll-to-top"
          @click=${this._handleScrollToTop}
        >
          <md-icon>arrow_upward</md-icon>
        </md-fab>
        <md-tooltip for="scroll-to-top" offset="8">Scroll to top</md-tooltip>
      </md-toolbar>
    `}};t.styles=l`
    :host {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      z-index: 100;
      pointer-events: none;
    }
    md-menu,
    md-toolbar {
      pointer-events: auto;
    }
    md-icon {
      display: inline-block;
      font-family: "Material Symbols Rounded";
      font-style: normal;
      font-weight: normal;
      letter-spacing: normal;
      line-height: 1;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
    }
  `,o([i({type:String})],t.prototype,"githubUrl",2),o([i({type:Boolean})],t.prototype,"rtl",2),o([r()],t.prototype,"themeMode",2),o([r()],t.prototype,"tooltipTexts",2),t=o([s("sw-toolbar")],t);export{t as a};
