class Files {
    
    constructor(input, containerId, btnShow) {
        this._input = $(input);
        this._container = $(containerId);
        this._btnShow = $(btnShow);
        this._btnShow.on('click', event => {
            event.preventDefault();
            this._input.trigger('click')
        });
        this._files = [];
        this.__startListener();
    }
    
    get files() {
        return this._files;
    }
    
    appendFiles(formData) {
        formData.delete(this._input.name);
        this._files.forEach(file => {
            formData.append('files[]', file);
        });
    }
    
    trigger() {
        $(this._btnShow).on(click, e => {
            $(this._input).trigger('click');
        })
    }
    
    __imagePreview(image, previewContainer) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            $(previewContainer).attr('style', 'background-image: url(' + e.target.result + ')');
            $(previewContainer).attr('data-name', image.name);
        }
        reader.readAsDataURL(image);
    }
    
    __startListener() {
        this._input.change(event => {
            let newFiles = []; 
            for(let index = 0; index < this._input[0].files.length; index++) {
                let file = this._input[0].files[index];
                newFiles.push(file);
                this._files.push(file);
            }
        
            newFiles.forEach(file => {
                let container = $('<div class="image container-flex-column justify-content-center align-items-center image-preview"><a href="#" class="danger delete-image-gallery" data-element="' + file.name + '"><i class="fas fa-trash-alt"></i></a></div>');
                this.__imagePreview(file, container);
                this._container.append(container);
                
                container.children().first().click( event => {
                    event.preventDefault();
                    let fileElement = $(event.currentTarget);
                    // let indexToRemove = this._files.indexOf(fileElement.attr('data-element'));
                    let indexToRemove = -1;
                    let fileName = fileElement.attr('data-element');
                    this._files.forEach((value, index) => {
                        if (value.name == fileName) {
                            indexToRemove = index;
                        }
                    })
                    fileElement.parent().remove();
                    this._files.splice(indexToRemove, 1);
                });
            });
        });
    }
    
}