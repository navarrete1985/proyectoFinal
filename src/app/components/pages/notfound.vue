<template>
<div id="container" class="container">
		<ul id="scene" class="scene">
			<li class="layer" data-depth="1.00"><img src="../../assets/images\404-01.png"></li>
			<li class="layer" data-depth="0.60"><img src="../../assets/images\shadows-01.png"></li>
			<li class="layer" data-depth="0.20"><img src="../../assets/images\monster-01.png"></li>
			<li class="layer" data-depth="0.40"><img src="../../assets/images\text-01.png"></li>
			<li class="layer" data-depth="0.10"><img src="../../assets/images\monster-eyes-01.png"></li>
		</ul>
		<h1>Our Site is Underconstruction - 10 days to go</h1>
		<input type="text" class="form-control"><a href="#" class="btn search">Search</a>
		<span>or</span>
		<a href="#" class="btn">Back to home</a>
	</div>
</template>

<script>
import notfound from '../../assets/js/parallax';
export default {
    mounted(){
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);
        
    }
}

</script>

<style lang="scss" scoped>
@import "../../assets/styles/404.css";
@import '../../assets/styles/mystyle';


body{
    background-color: $background-corporative !important;
}
</style>
