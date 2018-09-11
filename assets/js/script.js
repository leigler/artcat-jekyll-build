var Site = {}

Site.mobileMenu = function(){	
	$(".mobile-icon").on('click', function(){
		$("nav").toggleClass("open")
	})
}

Site.lightbox = function(){
	if($(".lightbox").length > 0){
		var imageArray = [],
				captionArray = [],
				updateDirections = function(index){
					//console.log(index, imageArray.length)
					//next button
					if(index + 1 < imageArray.length){
						$(".next").attr("data-target", imageArray[(index + 1)])
					}else{
						$(".next").attr("data-target", imageArray[0])
					}
					//prev button
					if(index - 1 >= 0){
						$(".prev").attr("data-target", imageArray[(index - 1)])
					}else{
						$(".prev").attr("data-target", imageArray[(imageArray.length - 1)])
					}
					// counter fill
					$(".counter").html((index + 1) + " / " + imageArray.length )
				}

		$(".image-set").on('click', function(){
			//add all image sources to imageArray
			if(imageArray.length == 0){
				$(".image-set").each(function(){

					imageArray.push($(this).children("img").attr("src"))

					if($(this).children("p").length > 0){
						captionArray.push($(this).children("p").text())
					}else{
						captionArray.push("")
					}
				})
			}

			// get current image and populate lightbox
			var thisSource = $(this).children("img").attr("src"),
			index = $.inArray(thisSource, imageArray)
			$(".current-image").attr("src", thisSource)

			// populate caption
			var caption = $(this).children("p").text()
			$(".lightbox-caption").text(caption)

			// populate next and prev buttons
			updateDirections(index)
			
			// animate lightbox in
			$(".lightbox").addClass("open")

		})

		$(".direction").on('click', function(){
			var target = $(this).attr("data-target"),
					index = $.inArray(target, imageArray)
			// update image
			$(".current-image").attr("src", target)
			// update caption
			$(".lightbox-caption").text(captionArray[index])
			// update direction controls
			updateDirections(index)
		})

		var exit = function(){
			$(".lightbox").removeClass("open")
		}
		$(".exit").on('click', exit)

	}else{
		return
	}
}

$(document).ready(function(){
	console.log("artcat")

	Site.mobileMenu()
	Site.lightbox()

})