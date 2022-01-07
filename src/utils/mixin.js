import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapState("book", [
            "filename",
            "bookFontSize",
            "themeslist",
            "selecttheme",
            "pgspercent",
            "capturehref",
            "themeslist",
            "selecttheme",
            "isbookprogressready",
            "isshowFontfamily",
            "fontfamilylist"
        ]),
    },
    methods: {
        
        ...mapMutations("book", ["setisbookprogressready", "setnavigation","SETTHEME", "setpgspercent","setisshowFontfamily","setrendition"]),
        ...mapActions("book", ["setfilename", "setistitleandmenushow"]),
    }
}