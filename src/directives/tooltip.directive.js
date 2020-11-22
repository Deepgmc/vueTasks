export default {
   bind(el, {value}) {
      M.Tooltip.init(el, {html: value})
   },
   unbind(elem) {
      const tooltip = M.tooltip.getInstance(elem)
      if(tooltip && tooltip.destroy){
         tooltip.destroy()
      }
   }
}
