const mainList = document.querySelector('#main');

let draggedItem = null;

mainList.addEventListener('dragstart', function (e) {
	if(e.target.classList.contains('list-item')){
		draggedItem = e.target;
		setTimeout(function () {
			e.target.style.opacity = '0.5';
		}, 0)
	}
});

let item = document.querySelectorAll('.lists');
mainList.addEventListener('dragend', function (e) {
	if(e.target.classList.contains('list-item')){
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem.style.opacity = '1';
			draggedItem = null;
		}, 0);
	}
})

mainList.addEventListener('dragover', function (e) {
	if(e.target.classList.contains('list') || e.target.parentElement.classList.contains('list')){
		e.preventDefault();
	}

});

mainList.addEventListener('dragenter', function (e) {
	// e.preventDefault();
	if(e.target.classList.contains('list')){
		e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
	}
	if (e.target.parentElement.classList.contains('list')) {
		e.target.parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
	}
});

mainList.addEventListener('dragleave', function (e) {
	if(e.target.classList.contains('list')){
		e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	}
	else if (e.target.parentElement.classList.contains('list')) {
		e.target.parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	}
});

mainList.addEventListener('drop', function (e) {
	if(e.target.classList.contains('list')){
		var botm = e.target.lastElementChild;
		e.target.insertBefore(draggedItem,botm);
		e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	}
	else if(e.target.parentElement.classList.contains('list')){
		var botm = e.target.parentElement.lastElementChild;
		e.target.parentElement.insertBefore(draggedItem,botm);
		e.target.parentElement.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	}
});

const bgColor = ["#FF5959", "#FFFA59", "#61FF59", "#59FFE8","#59AAFF", "#9D59FF", "#9D59FF", "#FF59FC", "#FF5972"];
mainList.addEventListener('click', (e)=>{
	if(e.target.classList.contains('fa-plus-circle')){
		const newTask = document.createElement('div');
		newTask.className='list-item';
		var description = prompt('Add description');
		if (description){
			newTask.appendChild(document.createTextNode(description));
			let crossIcn = document.createElement('i');
			crossIcn.classList.add('fas', 'fa-times');
			crossIcn.style.float = "right";
			newTask.appendChild(crossIcn);
			newTask.setAttribute('draggable','true');
			newTask.style.backgroundColor = bgColor[Math.floor(Math.random()*bgColor.length)];
			const botm = e.target.parentElement.parentElement.lastElementChild;
			e.target.parentElement.parentElement.insertBefore(newTask,botm);
		}
	}
	if(e.target.classList.contains('fa-plus')){
		const title = prompt('Add title');
		if(title){
			const newRow = document.createElement('div');
			newRow.className = 'list';

			// Title Of the Row
			const titleHead = document.createElement('div');
			titleHead.className = 'head';
			titleHead.appendChild(document.createTextNode(title));
			let crossIcn = document.createElement('i');
			crossIcn.classList.add('fas', 'fa-times');
			crossIcn.style.float = "right";
			titleHead.appendChild(crossIcn);

			// Bottom Button
			const botmBtn = document.createElement('div');
			botmBtn.classList.add('botm');
			botmBtn.setAttribute('draggable','false');
			// Plus icon
			const plusIcn = document.createElement('i');
			plusIcn.classList.add('fas', 'fa-plus-circle');
			botmBtn.appendChild(plusIcn);

			newRow.appendChild(titleHead);
			newRow.appendChild(botmBtn);
			const botm = e.target.parentElement.parentElement.parentElement.lastElementChild;
			e.target.parentElement.parentElement.parentElement.insertBefore(newRow,botm);
		}
	}
	if(e.target.classList.contains('fa-times')){
		removeEle(e.target);
	}
	if(e.target.classList.contains('delkanban')){
		removeEle(e.target);
	}
});

function removeEle(ele){
	if(ele.parentElement.classList.contains("list-item")){
		ele.parentElement.remove();
	}
	else if (ele.parentElement.classList.contains("head")) {
		if(confirm("Are You Sure?")){
			console.log('JHjhj');
			ele.parentElement.parentElement.remove();
		}
	}
	else if (ele.parentElement.nextElementSibling.classList.contains("lists")) {
		if(confirm("Are you sure want to delete " + ele.parentElement.previousElementSibling.innerText +" ?" )){
			ele.parentElement.nextElementSibling.remove();
			ele.parentElement.previousElementSibling.remove();
			ele.parentElement.remove();
		}
	}
}

$(document).ready(function(){
  $("#colDrag").click(function(){
		$( ".sortable-2" ).sortable({
			delay:500
		});
		$( ".sortable-2" ).sortable("enable");
			$("#colNonDrag").show();
			$("#colDrag").hide();
  });

	$("#colNonDrag").click(function(){
		$( ".sortable-2" ).sortable("disable");
			$("#colNonDrag").hide();
			$("#colDrag").show();
  });

	$("#newBoard").click(function(){
		const newName = prompt("Give name");
		if(newName){
			$("#main").append("<h2 class='m-3'>" + newName + "</h2>");
			$("#main").append(`
				<div style="margin-bottom: 20px;" class="btn-group btn-group-sm float-right">
				  <button type="button" class="btn btn-danger delkanban"> Delete</button>
				</div>
			`);
			$("#main").append(
			$('<div/>')
			.addClass("lists")
	    .addClass("sortable-2")
			.html(`
				<div class="finalList text-center">
					<p><b>Insert New Column</b></p>
					<div class="botm" draggable="false">
						<i class="fas fa-plus"></i>
					</div>
				</div>
			`)
	    );
		}
	});
});
