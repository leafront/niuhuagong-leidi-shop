var exec = require('child_process').exec;

exec('scp -r /Users/leafrontye/niutu/leidi-shop/dist/* root@111.231.103.97:/data/dev/h5-leidishop',(err, stdout, stderr) =>{

	if (err) {

		console.log(err);

		throw new Error(err);

	}

	console.log(stdout);

})


