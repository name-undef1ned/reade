import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import {setlocationcfi} from '../utils/localstorage'
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
            "fontfamilylist",
            'section',
            'nowsection',
            
        ]),
    },
    methods: {
        ...mapMutations("book", ["setisbookprogressready",
            "setnavigation",
            "SETTHEME",
            "setpgspercent",
            "setisshowFontfamily",
            "setrendition",
            "SETBOOKSECTIONS",
            "SETNOWSECTION",
            "SETVALUE1"
        ]),
        ...mapActions("book", ["setfilename", "setistitleandmenushow", "setaction"]),
        // 根据当前位置获取当前章节对象和维护的章节数据
        setnowsection() {


            // 拿到当前位置信息
            const nowpage = this.book.rendition.currentLocation()
            if (nowpage && nowpage.end.href && nowpage.end.index) {
                //   1更改章节对象
                this.SETNOWSECTION(this.book.navigation.get(nowpage.end.href))
                
                // 2更改章节场景状态数据section 章节标题 进度条需要
                this.setaction(nowpage.end.index - 1)
                
                // 3更新进度条
                this.SETVALUE1(Math.floor(nowpage.end.percentage*100))
            } else {
                // currentLocation获取到的多一个封面，-为真时等于减一，为假当前为0即封面的时候让当前对象为1即书籍信息
                this.SETNOWSECTION(this.$store.state.book.booksections[0])
                this.setaction(1)
                 // 3更新进度条
                 this.SETVALUE1(Math.floor(nowpage.end.percentage*100))
            }

            // 4拿到cfi存入localstorage
           
            setlocationcfi(this.filename,nowpage.start.cfi)
        }
    }
}