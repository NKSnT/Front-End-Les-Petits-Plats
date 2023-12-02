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
    dropdownContent.setAttribute('class', 'dropdownContent dropdown-hide');
    var dropdownSearch_container = document.createElement('div');
    dropdownSearch_container.classList = 'tagSearch';
    var dropdownSearch = document.createElement('input');
    dropdownSearch.id = `tagSearch_${itemType}`;
    dropdownSearch.type = 'search';
    var dropdownSearch_ico = document.createElement('img');
    dropdownSearch_ico.setAttribute('src', 'assets/icons/Group 4.svg');
    dropdownSearch_ico.classList = 'research_ico';
    dropdownSearch.addEventListener('keyup', function (e) {
        var x = this.value.toLocaleUpperCase();
        filterFunction(x);
    });
    dropdownSearch.addEventListener('search', function (e) {
        filterFunction('');
    });
    dropdownSearch_container.appendChild(dropdownSearch);
    dropdownSearch_container.appendChild(dropdownSearch_ico);
    dropdownContent.appendChild(dropdownSearch_container);

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
        function isDescendant(targetEl) {
            var node = targetEl.parentNode;
            while (node != null) {
                if (node.classList != undefined && node.classList.contains('dropdownContent')) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }
        if (isDescendant(targetEl)) {
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
    function filterFunction(data) {
        //var filter = dropdownSearch.value.toLocaleUpperCase();
        var filter = data;
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
