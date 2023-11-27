function filterTemplate(items, itemType) {
    var dropdown = document.createElement('div');
    dropdown.classList = 'filterDropdown';
    dropdown.id = `${itemType}Filter`;
    var dropdownBtn = document.createElement('button');
    dropdownBtn.innerText = `${itemType}`;
    dropdownBtn.classList = 'dropdownBtn';
    var dropdownArroy = document.createElement('img');
    dropdownArroy.classList = 'dropdownArrow';
    dropdownArroy.setAttribute('src', `assets/icons/down.svg`);
    var dropdownContent = document.createElement('div');
    //dropdownContent.classList = 'dropdownContent dropdown-hide';
    dropdownContent.setAttribute('class', 'dropdownContent dropdown-hide');
    var dropdownSearch = document.createElement('input');
    dropdownSearch.id = `tagSearch_${itemType}`;
    dropdownSearch.type = 'text';
    dropdownSearch.addEventListener('keyup', () => {
        filterFunction();
    });

    dropdownContent.appendChild(dropdownSearch);

    for (n = 0; n < items.length; n++) {
        var tagOption = document.createElement('p');
        tagOption.innerText = items[n];
        tagOption.className = 'tagOption';
        dropdownContent.appendChild(tagOption);
        tagOption.addEventListener('click', function () {
            filterIni().bytag(this);
        });
    }
    dropdownBtn.appendChild(dropdownArroy);
    dropdown.appendChild(dropdownBtn);
    dropdown.appendChild(dropdownContent);
    dropdownBtn.addEventListener('click', function (e) {
        /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
        e.stopPropagation();
        closeAllFilter(this);
        this.nextSibling.classList.toggle('dropdown-hide'); //toogle hide if not else untoggle hide
        this.classList.toggle('dropdown-active'); //change the dropdown button on drop
        if (this.classList.contains('dropdown-active')) {
            dropdownArroy.setAttribute('src', `assets/icons/up.svg`);
        } else {
            dropdownArroy.setAttribute('src', `assets/icons/down.svg`);
        }
    });
    document.addEventListener('click', (evt) => {
        let targetEl = evt.target; // clicked element
        //pas forcement utile lorsque les option seron selectionable
        if (
            targetEl.parentNode.classList.contains('dropdownContent') /* ||
            targetEl.parentNode.classList == 'selectedTag' */
        ) {
            // This is a click inside, does nothing, just return.
            return;
        } else {
            closeAllFilter();
        }
    });
    function closeAllFilter(elmnt) {
        var arrNo = [];
        var i;
        var allFilterContent = document.getElementsByClassName('dropdownContent');
        var allFilter = document.getElementsByClassName('dropdownBtn');
        for (i = 0; i < allFilter.length; i++) {
            if (elmnt == allFilter[i]) {
                arrNo.push(i);
            } else {
                allFilter[i].classList.remove('dropdown-active');
                allFilter[i].firstElementChild.setAttribute('src', `assets/icons/down.svg`);
                //allFilterContent[i].classList.add('dropdown-hide');
            }
        }
        for (i = 0; i < allFilterContent.length; i++) {
            if (arrNo.indexOf(i)) {
                allFilterContent[i].classList.add('dropdown-hide');
                //allFilter[i].firstElementChild.setAttribute('src', `assets/icons/down.svg`);
            }
        }
    }
    /* filter tags option to match search value*/
    function filterFunction() {
        var filter = dropdownSearch.value.toLocaleUpperCase();
        var p = dropdownContent.getElementsByTagName('p');
        for (i = 0; i < items.length; i++) {
            txtValue = p[i].textContent || p[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                p[i].style.display = '';
            } else {
                p[i].style.display = 'none';
            }
        }
    }
    return dropdown;
}
