export default function blob2DataURL(blob, successFn, failFn) {
  const reader = new FileReader();
  reader.addEventListener(
    "onloadend",
    function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        successFn(evt.target.result);
      } else {
        failFn(evt.target.error);
      }
    },
    false
  );
  reader.readAsDataURL(blob);
}
