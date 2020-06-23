window.onload = function() {
	
	// identifications:

		const chairs = document.querySelectorAll('.chair')
		const addButton = document.querySelector('.button-add')
		const removeButton = document.querySelector('.button-remove')
		const enableRandomButton = document.querySelector('.random-enable')
		const disableRandomButton = document.querySelector('.random-disable')

	// functions:
		
		// in order:

		let shownChairs = 0

		function addChair() {
			let chairToShow = chairs[shownChairs]

			if (chairToShow === undefined) {
				return Swal.fire({
					icon: 'error',
					title: '¡Error!',
					text: 'No se pueden agregar mas de 8 sillas.'})
			}

			chairToShow.style = 'visibility: visible'

			shownChairs++
		}

		function removeChair() {
			let chairToHide = chairs[shownChairs - 1]

			if (chairToHide === undefined) {
				return Swal.fire({
					icon: 'error',
					title: '¡Error!',
					text: 'No quedan sillas para eliminar.'})
			}

			chairToHide.style = 'visibility: hidden'

			shownChairs--		
		}

		// random:

		let randomMode = false

		const indexList = [0, 1, 2, 3, 4, 5, 6, 7]

		function mixIndexList() {
		  let i = indexList.length     
		  let randomNumber = 0      
		  let randomIndex     

		  while (i--) { 
		    const randomNumber = Math.floor(Math.random() * (i + 1)) 

		    randomIndex = indexList[i] 
		    indexList[i] = indexList[randomNumber]  
		    indexList[randomNumber] = randomIndex	
		  }

		  return indexList
		}

		const usedIndex = []

		function addRandomChair() {
			if (indexList.length > 0) {
				const mixedIndexList = mixIndexList()
				const randomChairToShow = chairs[indexList[0]]
				randomChairToShow.style = 'visibility: visible'
				usedIndex.push(indexList[0])
				console.log(usedIndex)
				indexList.splice(0, 1)
			}

			else {
				Swal.fire({
					icon: 'error',
					title: 'Error!',
					text: 'No se puede agregar mas de 8 sillas.'
				})
			}
		}
		

	function removeRandomChair() {
		const lastUsedIndex = usedIndex.length - 1
		const randomChairToHide = chairs[usedIndex[lastUsedIndex]]
		
		if (randomChairToHide === undefined) {
			return Swal.fire({
				icon: 'error',
				title: 'Error!',
				text: 'No quedan sillas para eliminar'
			})
		}

		randomChairToHide.style = 'visibility: hidden'
		indexList.push(usedIndex[lastUsedIndex])
		usedIndex.splice(lastUsedIndex, 1)
	}


	// events:

		// click:

		enableRandomButton.onclick = function() {
			randomMode = true
			console.log(randomMode)
			Swal.fire({
				icon: 'success',
				title: 'Modo aleatorio activado.'
			})
		}

		disableRandomButton.onclick = function() {
			randomMode = false
			console.log(randomMode)
			Swal.fire({
				icon: 'success',
				title: 'Modo aleatorio desactivado'
			})
		}

		addButton.onclick = function() {
			if (randomMode === false) {
				addChair()
			}

			else {
				addRandomChair()
			}
		}

		removeButton.onclick = function() {
			if (randomMode === false) {
				removeChair()
			}

			else {
				removeRandomChair()
			}
		}

		// mouse over:

		addButton.onmouseover = function() {
			addButton.style = 'cursor: pointer'
		}

		removeButton.onmouseover = function() {
			removeButton.style = 'cursor: pointer'
		}

		enableRandomButton.onmouseover = function() {
			enableRandomButton.style = 'cursor: pointer'
		}	

		disableRandomButton.onmouseover = function() {
			disableRandomButton.style = 'cursor: pointer'
		}	

		// key press

		window.onkeypress = function(e) {
			if (e.key === '+') {
				addChair()
			} 
			else if (e.key === '-') {
				removeChair()
			} 
		}
}