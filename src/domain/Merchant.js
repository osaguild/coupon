import merchants from "../../data/merchant.json";

function search(form) {
  let _mi = merchants;
  let _mo = [];
  let i = 0;
  let j = 0;

  // search area
  if (form.area != null && form.area != "ALL") {
    for (i in _mi) {
      if (_mi[i].address.indexOf(form.area) > -1) {
        _mo.push(_mi[i]);
      }
    }
    _mi = _mo;
  }
  // search category
  if (form.category != null && form.category != "ALL") {
    _mo = [];
    i = 0;
    for (i in _mi) {
      if (_mi[i].category == form.category) {
        _mo.push(_mi[i]);
      }
    }
    _mi = _mo;
  }
  // search paper_electronic
  if (
    form.paper_electronic != null &&
    form.paper_electronic != "ALL"
  ) {
    _mo = [];
    i = 0;
    j = 0;
    for (i in _mi) {
      for (j in _mi[i].ticket) {
        if (_mi[i].ticket[j] == form.paper_electronic) {
          _mo.push(_mi[i]);
        }
      }
    }
    _mi = _mo;
  }
  // search private_common
  if (
    form.private_common != null &&
    form.private_common != "ALL"
  ) {
    _mo = [];
    i = 0;
    j = 0;
    for (i in _mi) {
      for (j in _mi[i].ticket) {
        if (_mi[i].ticket[j] == form.private_common) {
          _mo.push(_mi[i]);
        }
      }
    }
  }
  _mo.position;
  return _mo;
}

export default {
  search,
};