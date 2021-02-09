import markdownIt from 'markdown-it';
import list from './plugins/list';

// 加载 markdown-it 的渲染子插件
// import mdHighlight from './js/plugins/highlight';
// import mdFootnote from './js/plugins/footnote';
// import mdBlockQuote from './js/plugins/blockquote';
// import mdImage from './js/plugins/image';
// import blockifyTag from './js/plugins/blockify-tag';
// import mdTableContainter from './js/plugins/table-container';


let md = markdownIt({
    html: true,             // 启用 html 语法
    xhtmlOut: false,        // 使用 '/' 来闭合单标签 (</br>)
    breaks: false,          // 转换段落里的 '\n' 到 <br>
    langPrefix: 'language', // 给围栏代码块的 css 语言前缀 处理额外的高亮代码
    linkify: false,         // 将类似于 URL 的文本自动转换为超链接
    typographer: false,     // 启用一些语言中里的替换和引号美化
    quotes: '“”‘’'          // typo开启时候的 一般不用考虑
})

md.use(list)

export default md;
