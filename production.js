var exec = require('child_process').exec;

function pack() {

	return new Promise ( (resolve,reject) => {

		exec('npm run build',(err,stdout,stderr) => {

			if (err) {
				console.log(err);

				throw new Error(err);
				reject(err)
			}

			console.log(stdout)

			resolve(stdout)
		})

	})

}

pack().then((resolve,reject) => {
	exec('scp -r /Users/leafrontye/niutu/leidi-shop/dist/* root@106.14.205.33:/data/www/h5-leidishop',(err, stdout, stderr) =>{

		if (err) {

			console.log(err);

			throw new Error(err);

		}

		console.log(stdout);

	})

})
