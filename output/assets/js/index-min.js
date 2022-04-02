class Task{constructor(t){this.content=t,this.isCompleted=!1}}class ToDoList{constructor(t){this.tasksContainer=t,this.tasks=JSON.parse(localStorage.getItem("tasks"))||[],this._activeTasks=[],this._completedTasks=[],this.bindAddTaskButton(),this.createTasksFilters(),this.createTasksList(this.tasks)}get activeTasks(){return this._activeTasks=this.tasks.filter(t=>!1===t.isCompleted),this._activeTasks}get completedTasks(){return this._completedTasks=this.tasks.filter(t=>!0===t.isCompleted),this._completedTasks}bindAddTaskButton(){const t=document.getElementById("todo-button-add"),e=document.getElementById("todo-input");e.addEventListener("keyup",t=>{"Enter"===t.key&&(this.saveTask(e.value),e.value="")}),t.addEventListener("click",()=>{this.saveTask(e.value),e.value=""})}saveTask(t){if(""!==t){const e=new Task(t);return this.tasks.unshift(e),this.addToLocalStorage(),void this.createTasksList(this.tasks)}alert("Type something!")}createTasksList(t){this.createActiveTaskCounter(),this.tasksContainer.innerHTML="",t.forEach((t,e)=>{const s=document.createElement("li"),a=document.createElement("span"),o=document.createElement("div"),i=document.createElement("button"),n=document.createElement("button");s.classList.add("todo-item"),a.classList.add("todo-item-content"),o.classList.add("todo-item-actions"),a.innerHTML=t.content,i.setAttribute("class","todo-task-button todo-done-button"),i.innerHTML="Done",i.addEventListener("click",e=>{e.currentTarget.parentNode.parentNode.classList.add("todo-item-completed"),o.removeChild(i),t.isCompleted=!0,this.addToLocalStorage(),this.createTasksList(this.tasks)}),n.setAttribute("class","todo-task-button todo-remove-button"),n.innerHTML="Delete",n.addEventListener("click",()=>{this.tasksContainer.removeChild(s),this.tasks.splice(e,1),this.addToLocalStorage(),this.createTasksList(this.tasks)}),t.isCompleted&&(s.classList.add("todo-item-completed"),o.append(n)),t.isCompleted||o.append(i,n),s.append(a,o),this.tasksContainer.append(s)})}createTasksFilters(){const t=document.getElementById("todo-show-all"),e=document.getElementById("todo-show-active"),s=document.getElementById("todo-show-completed"),a=document.getElementById("todo-clear-completed");t.addEventListener("click",t=>{t.preventDefault(),this.createTasksList(this.tasks)}),e.addEventListener("click",t=>{t.preventDefault(),this.createTasksList(this.activeTasks)}),s.addEventListener("click",t=>{t.preventDefault(),this.createTasksList(this.completedTasks)}),a.addEventListener("click",t=>{if(t.preventDefault(),this.completedTasks.length)return this.completedTasks.forEach(t=>{this.tasks.splice(this.tasks.findIndex(e=>e.content===t.content),1)}),this.addToLocalStorage(),void this.createTasksList(this.tasks);alert("All tasks have active status!")})}addToLocalStorage(){localStorage.setItem("tasks",JSON.stringify(this.tasks))}createActiveTaskCounter(){const t=document.getElementById("todo-counter-content");let e=this.activeTasks.length;switch(e){case 0:t.innerHTML="All tasks completed!";break;case 1:t.innerHTML=`${e} task left`;break;default:t.innerHTML=`${e} tasks left`}}}const toDoContainer=document.getElementById("todo-items"),toDoList=new ToDoList(toDoContainer);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlRhc2siLCJbb2JqZWN0IE9iamVjdF0iLCJjb250ZW50IiwidGhpcyIsImlzQ29tcGxldGVkIiwiVG9Eb0xpc3QiLCJ0YXNrc0NvbnRhaW5lciIsInRhc2tzIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIl9hY3RpdmVUYXNrcyIsIl9jb21wbGV0ZWRUYXNrcyIsImJpbmRBZGRUYXNrQnV0dG9uIiwiY3JlYXRlVGFza3NGaWx0ZXJzIiwiY3JlYXRlVGFza3NMaXN0IiwiYWN0aXZlVGFza3MiLCJmaWx0ZXIiLCJ0YXNrIiwiY29tcGxldGVkVGFza3MiLCJidXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5wdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleSIsInNhdmVUYXNrIiwidmFsdWUiLCJ1bnNoaWZ0IiwiYWRkVG9Mb2NhbFN0b3JhZ2UiLCJhbGVydCIsInRhc2tzQXJyYXkiLCJjcmVhdGVBY3RpdmVUYXNrQ291bnRlciIsImlubmVySFRNTCIsImZvckVhY2giLCJ0YXNrSW5kZXgiLCJ0YXNrSXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJ0YXNrQ29udGVudCIsInRhc2tBY3Rpb25zIiwiZG9uZUJ1dHRvbiIsInJlbW92ZUJ1dHRvbiIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsImN1cnJlbnRUYXJnZXQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJzcGxpY2UiLCJhcHBlbmQiLCJzaG93QWxsIiwic2hvd0FjdGl2ZSIsInNob3dDb21wbGV0ZWQiLCJjbGVhckNvbXBsZXRlZCIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwiY29tcGxldGVkVGFzayIsImZpbmRJbmRleCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJjb3VudGVyIiwiYW1vdW50IiwidG9Eb0NvbnRhaW5lciIsInRvRG9MaXN0Il0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxL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U0FFNUI4QyxFQUFXNUIsaUJBQWlCLFFBQVNDLElBQ25DQSxFQUFFOEIsaUJBQ0ZyRCxLQUFLYSxnQkFBZ0JiLEtBQUtjLGVBRTVCcUMsRUFBYzdCLGlCQUFpQixRQUFTQyxJQUN0Q0EsRUFBRThCLGlCQUNGckQsS0FBS2EsZ0JBQWdCYixLQUFLaUIsa0JBRTVCbUMsRUFBZTlCLGlCQUFpQixRQUFTQyxJQUd2QyxHQUZBQSxFQUFFOEIsaUJBRUVyRCxLQUFLaUIsZUFBZXFDLE9BTXRCLE9BTEF0RCxLQUFLaUIsZUFBZWdCLFFBQVFzQixJQUMxQnZELEtBQUtJLE1BQU0yQyxPQUFPL0MsS0FBS0ksTUFBTW9ELFVBQVV4QyxHQUFRQSxFQUFLakIsVUFBWXdELEVBQWN4RCxTQUFVLEtBRTFGQyxLQUFLNEIseUJBQ0w1QixLQUFLYSxnQkFBZ0JiLEtBQUtJLE9BSTVCeUIsTUFBTSxtQ0FJVi9CLG9CQUNFUyxhQUFha0QsUUFBUSxRQUFTcEQsS0FBS3FELFVBQVUxRCxLQUFLSSxRQUdwRE4sMEJBQ0UsTUFBTTZELEVBQVV4QyxTQUFTQyxlQUFlLHdCQUN4QyxJQUFJd0MsRUFBUzVELEtBQUtjLFlBQVl3QyxPQUU5QixPQUFRTSxHQUNOLEtBQUssRUFDSEQsRUFBUTNCLFVBQVksdUJBQ3BCLE1BRUYsS0FBSyxFQUNIMkIsRUFBUTNCLGFBQWU0QixjQUN2QixNQUVGLFFBQ0VELEVBQVEzQixhQUFlNEIsaUJBTS9CLE1BQU1DLGNBQWdCMUMsU0FBU0MsZUFBZSxjQUN4QzBDLFNBQVcsSUFBSTVELFNBQVMyRCIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IgKGNvbnRlbnQpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9Eb0xpc3Qge1xyXG4gICAgY29uc3RydWN0b3IgKHRhc2tzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy50YXNrc0NvbnRhaW5lciA9IHRhc2tzQ29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB8fCBbXTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVUYXNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2NvbXBsZXRlZFRhc2tzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuYmluZEFkZFRhc2tCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRhc2tzRmlsdGVycygpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVGFza3NMaXN0KHRoaXMudGFza3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhY3RpdmVUYXNrcyAoKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlVGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pc0NvbXBsZXRlZCA9PT0gZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVUYXNrcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29tcGxldGVkVGFza3MgKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbXBsZXRlZFRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaXNDb21wbGV0ZWQgPT09IHRydWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wbGV0ZWRUYXNrcztcclxuICAgIH1cclxuXHJcbiAgICBiaW5kQWRkVGFza0J1dHRvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tYnV0dG9uLWFkZCcpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8taW5wdXQnKTtcclxuXHJcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRhc2soaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVGFzayhpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGFzayAoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50ICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2soY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza3MudW5zaGlmdCh0YXNrKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRhc2tzTGlzdCh0aGlzLnRhc2tzKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFsZXJ0KCdUeXBlIHNvbWV0aGluZyEnKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUYXNrc0xpc3QgKHRhc2tzQXJyYXkpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdGl2ZVRhc2tDb3VudGVyKCk7XHJcbiAgICAgICAgdGhpcy50YXNrc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgdGFza3NBcnJheS5mb3JFYWNoKCh0YXNrLCB0YXNrSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgY29uc3QgdGFza0FjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgY29uc3QgZG9uZVRhc2tDbGFzcyA9ICd0b2RvLWl0ZW0tY29tcGxldGVkJztcclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nKTtcclxuICAgICAgICAgICAgdGFza0NvbnRlbnQuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLWNvbnRlbnQnKTtcclxuICAgICAgICAgICAgdGFza0FjdGlvbnMuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLWFjdGlvbnMnKTtcclxuXHJcbiAgICAgICAgICAgIHRhc2tDb250ZW50LmlubmVySFRNTCA9IHRhc2suY29udGVudDtcclxuXHJcbiAgICAgICAgICAgIGRvbmVCdXR0b24uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2RvLXRhc2stYnV0dG9uIHRvZG8tZG9uZS1idXR0b24nKVxyXG4gICAgICAgICAgICBkb25lQnV0dG9uLmlubmVySFRNTCA9ICdEb25lJztcclxuXHJcbiAgICAgICAgICAgIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKGRvbmVUYXNrQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgdGFza0FjdGlvbnMucmVtb3ZlQ2hpbGQoZG9uZUJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFza3NMaXN0KHRoaXMudGFza3MpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmVtb3ZlQnV0dG9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndG9kby10YXNrLWJ1dHRvbiB0b2RvLXJlbW92ZS1idXR0b24nKVxyXG4gICAgICAgICAgICByZW1vdmVCdXR0b24uaW5uZXJIVE1MID0gJ0RlbGV0ZSc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzQ29udGFpbmVyLnJlbW92ZUNoaWxkKHRhc2tJdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhc2tzTGlzdCh0aGlzLnRhc2tzKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXNrLmlzQ29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKGRvbmVUYXNrQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kKHJlbW92ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGFzay5pc0NvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGFza0FjdGlvbnMuYXBwZW5kKGRvbmVCdXR0b24sIHJlbW92ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRhc2tJdGVtLmFwcGVuZCh0YXNrQ29udGVudCwgdGFza0FjdGlvbnMpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tzQ29udGFpbmVyLmFwcGVuZCh0YXNrSXRlbSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUYXNrc0ZpbHRlcnMgKCkge1xyXG4gICAgICAgIGNvbnN0IHNob3dBbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1zaG93LWFsbCcpO1xyXG4gICAgICAgIGNvbnN0IHNob3dBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1zaG93LWFjdGl2ZScpO1xyXG4gICAgICAgIGNvbnN0IHNob3dDb21wbGV0ZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1zaG93LWNvbXBsZXRlZCcpO1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQ29tcGxldGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tY2xlYXItY29tcGxldGVkJyk7XHJcblxyXG4gICAgICAgIHNob3dBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFza3NMaXN0KHRoaXMudGFza3MpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNob3dBY3RpdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFza3NMaXN0KHRoaXMuYWN0aXZlVGFza3MpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNob3dDb21wbGV0ZWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFza3NMaXN0KHRoaXMuY29tcGxldGVkVGFza3MpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNsZWFyQ29tcGxldGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcGxldGVkVGFza3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZFRhc2tzLmZvckVhY2goY29tcGxldGVkVGFzayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UodGhpcy50YXNrcy5maW5kSW5kZXgodGFzayA9PiB0YXNrLmNvbnRlbnQgPT09IGNvbXBsZXRlZFRhc2suY29udGVudCksIDEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhc2tzTGlzdCh0aGlzLnRhc2tzKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFsZXJ0KCdBbGwgdGFza3MgaGF2ZSBhY3RpdmUgc3RhdHVzIScpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UgKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRoaXMudGFza3MpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVBY3RpdmVUYXNrQ291bnRlciAoKSB7XHJcbiAgICAgICAgY29uc3QgY291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWNvdW50ZXItY29udGVudCcpO1xyXG4gICAgICAgIGxldCBhbW91bnQgPSB0aGlzLmFjdGl2ZVRhc2tzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChhbW91bnQpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY291bnRlci5pbm5lckhUTUwgPSAnQWxsIHRhc2tzIGNvbXBsZXRlZCEnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIuaW5uZXJIVE1MID0gYCR7YW1vdW50fSB0YXNrIGxlZnRgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyLmlubmVySFRNTCA9IGAke2Ftb3VudH0gdGFza3MgbGVmdGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB0b0RvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8taXRlbXMnKTtcclxuY29uc3QgdG9Eb0xpc3QgPSBuZXcgVG9Eb0xpc3QodG9Eb0NvbnRhaW5lcik7XHJcbiJdLCJmaWxlIjoiaW5kZXgtbWluLmpzIn0=
