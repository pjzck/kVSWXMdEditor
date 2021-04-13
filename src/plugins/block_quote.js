function makeRule(md) {
    return function addTableContainer(state) {
        let layer = 0;
        let outerQuoteToken;

        for (let i = 0; i < state.tokens.length; i++) {
            const curToken = state.tokens[i];
            if (curToken.type === 'blockquote_open') {
                if (layer === 0) {
                    // 最外层 blockquote 的 token
                    outerQuoteToken = curToken;
                }
                layer++;
                continue;
            }

            // 第一个非 < 的 token
            // 最多只支持三层的 layer
            if (layer > 0) {
                outerQuoteToken.attrJoin('class', 'mpe-preview multiquote-' + Math.min(3, layer));
                layer = 0;
            }
        }
    }
}

module.exports = {
    apply : function(md) {
        md.core.ruler.push('blockquote-class', makeRule(md));
    }
}
