Vue.component('search-bar-component', {
	
		// created() {
		// 	this.getCart()
		// },
		// data: {
		// 	items:[]
		// },
		template: 
	`<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Bookworm Store</a>
				<form id="search-bar" class="navbar-form navbar-left" action="" >
			    	<div class="input-group">
			        	<input type="text" class="form-control" placeholder="Search" name="search">
			        	<div class="input-group-btn">
			          		<button class="btn btn-default" type="submit" value="cari">
			          			<i class="glyphicon glyphicon-search"></i>
			          		</button>
			        	</div>
		      		</div>
	    		</form>
	    		<button class="btn btn-danger navbar-btn">Advance</button>
			
	    		<button type="button" class="btn btn-info btn-lg" id="cart" data-toggle="modal" data-target="#cartModal" v-on:click=getCart()><span class="glyphicon glyphicon-shopping-cart"></span></button>
	        		<div class="modal fade" id="cartModal" role="dialog">
	        					
	        			<div class="modal-dialog modal-lg">
	        				<div class="panel panel-info">
		        				<div class="modal-content">
		        					<div class="modal-header">
							          	<div class="panel-heading">
											<div class="panel-title">
												<div class="row">
													<div class="col-xs-6">
														<h5><span class="glyphicon glyphicon-shopping-cart"></span> Shopping Cart</h5>
													</div>
													<div class="col-xs-6">
														<button type="button" class="btn btn-primary btn-sm btn-block">
															<span class="glyphicon glyphicon-share-alt"></span> Continue shopping
														</button>
													</div>
												</div>
											</div>
										</div>
							        </div>
							         <div class="modal-body" >	
							         
							         	<div class="panel-body">
											<div class = "product-list"  v-for="item in items">
												<div class="row">
													<div class="col-xs-2"><img class="img-responsive" v-bind:src="item.image" alt="IMG">
													</div>
													<div class="col-xs-3">
														<h4 class="product-name"><strong>{{item.title}}</strong></h4><h4><small>Product description</small></h4>
													</div>
													<div class="col-xs-7">
														<div class="col-xs-5">
															<h6><strong>Rp. {{item.price.toLocaleString( {style:"currency"})}} </strong></h6>
														</div>
														<div class="col-xs-1">
															<h6><strong>x</strong></h6>
														</div>
														<div class="col-xs-1" >
															<h6><strong>{{item.quantity}}</strong></h6>
														</div>
														<div class="col-xs-1">
															<h6><strong>=</strong></h6>
														</div>
														<div class="col-xs-2">
															<h6><strong>Rp.{{(item.price *item.quantity).toLocaleString( {style:"currency" })}}</strong></h6>
														</div>
														<div class="col-xs-2">
															<button v-on:click="removeToCart(item)"><i class="glyphicon glyphicon-trash"></i>
															</button>
														</div>
													</div>
												</div>
												<hr>
											</div>							
										</div>
									</div>		
							        <div class="modal-footer">
									  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									  <a href="checkout.html"><button type="button" class="btn btn-default">Buy Now</button></a>
							        </div>
		        				</div>
	        				</div>
	        			</div>
	        		</div>
			</div>
		</nav>`,
		methods: {
			getCart() {
				axios.get('http://localhost:3000/carts/show')
				.then(dataCarts=>{
					const {data} = dataCarts
					this.items = data 
				})
				.catch(err=>{
					console.log(err)
				})	

			},
			removeToCart(item) {
				// console.log(item)
				item.quantity -= 1
				// console.log(item.title)
				if(item.quantity==0){
					var cartRemove = this.items.filter(function(book) {
						console.log(book.title,item.title)
						return book.title !== item.title
						
					})
					console.log(cartRemove,"cartRemove")
					this.items = cartRemove	
				}

				axios.post('http://localhost:3000/carts/remove',item)
				.then(response=>{
					console.log("=====",response)
				})
				.catch(err=>{
					console.log(err.message)
				})
			}
		},
		props:['items']
})

console.log("search componernt")
