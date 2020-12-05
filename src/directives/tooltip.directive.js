export default {
   bind(el, {value}) {
      M.Tooltip.init(el, {html: value})
   },
   unbind(elem) {
      if(!M.tooltip) return
      const tooltip = M.tooltip.getInstance(elem)
      if(tooltip && tooltip.destroy){
         tooltip.destroy()
      }
   }
}
