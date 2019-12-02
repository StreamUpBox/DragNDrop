<<<<<<< HEAD
import { Component, ViewChild, OnInit } from '@angular/core';
import { DragAndDropDataService } from './drag-and-drop-data.service';
import { NFile } from './NFile';
import { NgForm } from '@angular/forms';
import { LoadersDirective } from './loaders.directive';
import { FileItem } from 'projects/nupload/src/lib/file-item.class';
import { FileUploader } from 'projects/nupload/src/lib/file-uploader.class';

export class Employee {
    constructor(public name: string, public age: number) { }
}

=======
import { Component } from '@angular/core';
>>>>>>> b0c936dea4d40d142891f8d78ac09d7982c9271b

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent implements OnInit {
    public dragFolders: any[];
    public dragFiles: any[];
    public activeFolder: any;
    public activeFile: any;
    selector: string = '.main-panel';

    @ViewChild(LoadersDirective,{static:true}) v: LoadersDirective;

    constructor(private dragAndDropDataService: DragAndDropDataService) {
        this.dragFolders = dragAndDropDataService.getFolders().splice(0, 2);
        this.dragFiles = dragAndDropDataService.getFiles().splice(0, 5);
        // Set root folder
        this.activeFolder = undefined;
    }

    public onDrop($event) {
        console.log($event);
        // $event.items.forEach(item => {
        //     item.parent_uid = $event.target.uid;
        // });

        // this.dragFolders = this.dragFolders.slice();
        // this.dragFiles = this.dragFiles.slice();
    }

    public goToFolder(folder) {
        this.activeFolder = folder;
    }

    public goBack(activeFolder) {
        if (activeFolder.parent_uid === '0') {
            this.activeFolder = undefined;
        } else {
            this.activeFolder = this.dragFolders.find(folder => folder.uid === activeFolder.parent_uid);
        }
    }

    didCLick(file: NFile) {
        console.log(file);
        this.activeFile = file;
    }


    // experimenting angular change detection
    // tslint:disable-next-line:member-ordering
    emp = new Employee('Mahesh', 20);
    // tslint:disable-next-line:member-ordering
    msg: string = 'Hello World!';

    onFormSubmit(empForm: NgForm) {

        const name = empForm.controls['name'].value;
        const age = empForm.controls['age'].value;
        this.emp = new Employee(name, age);
    }
    onSroll() {
        console.log('now we can get additional data');
        this.dragFolders.unshift(this.dragAndDropDataService.getFolders().splice(0, 1));
        this.dragFiles.push(this.dragAndDropDataService.getFiles().splice(0, 1) );
       // this.onCrollEvent.emit(true);
    }
    onUpScroll() {
        console.log('we got some intesting  scroll up');
    }
    onUp(ev) {
        console.log('scrolled up!', ev);
    }
    // tslint:disable-next-line:member-ordering
    public overlay_display = 'none';
    // tslint:disable-next-line:member-ordering
    public uploader: FileUploader = new FileUploader({url: 'URL', itemAlias: 'photo', headers: [{name: 'crstf', value: ''}]});
    // tslint:disable-next-line:member-ordering
    public hasAnotherDropZoneOver: boolean = false;
    // tslint:disable-next-line:member-ordering
    public fileHistory: any[] = [];
    ngOnInit() {
        this.uploader.onAfterAddingFile = () => {
            this.overlay_display = 'block';
          //  this.fileHistory.push({name:file.file.name,id:file.file.rawFile.lastModified,file_error:false, progress:0});
            this.uploader.uploadAll();
        };
        this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
            console.log(fileItem);
            console.log(progress);
          };
        // this.uploader.onErrorItem = (file: any) => {

        //     const tmp = this.fileHistory;
            // let file_to_update = tmp.filter(_file=>_file.id==file.file.rawFile.lastModified)[0];
            // file_to_update.file_error=true;
            // this.fileHistory =[...this.updateArray(this.fileHistory,0,item => (file_to_update))];
            // console.log(this.fileHistory);
        // };
        this.uploader.onProgressAll = (progress) => {
            // tslint:disable-next-line:no-console
            console.info('onProgressAll', progress);
        };
        this.uploader.onSuccessItem = (fileItem: FileItem, response, status, headers) => {
            // tslint:disable-next-line:no-console
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        this.uploader.onErrorItem = (fileItem: FileItem, response, status, headers) => {
            // tslint:disable-next-line:no-console
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        this.uploader.onCancelItem = (fileItem: FileItem, response, status, headers) =>  {
            // tslint:disable-next-line:no-console
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        this.uploader.onCompleteItem = (fileItem, response, status, headers) =>  {
            // tslint:disable-next-line:no-console
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        this.uploader.onCompleteAll = () => {
            // tslint:disable-next-line:no-console
            console.info('onCompleteAll');
        };
        this.uploader.onWhenAddingFileFailed = (item /*{File|FileLikeObject}*/, filter, options) => {
            // tslint:disable-next-line:no-console
            console.info('onWhenAddingFileFailed', item, filter, options);
        };

    }
    updateArray = (array, index , updateFn) => {
        return [
        ...array.slice(0, index),
        updateFn(array[index]),
        ...array.slice(index + 1)
        ];
      }
    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }
=======
export class AppComponent {
  title = 'fli';
>>>>>>> b0c936dea4d40d142891f8d78ac09d7982c9271b
}
