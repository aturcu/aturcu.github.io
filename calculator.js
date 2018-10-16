window.addEventListener('load', function() {
	$list = $("#list");

	$("#subbut1").on('click', function(event) {
		event.preventDefault();
		$list.empty();
		const disease = $('form input[type=radio]:checked').val();
		let disease_is_valid = false;
		const population_string = document.getElementById("population").value;
		let population_is_valid = false;

		if (disease == undefined || !/^[0-9]*$/.test(population_string) || population_string == "") {
			const error = $('<li></li>').text("ERROR: Please ensure that the disease and total population fields have been filled out properly.");
			$list.append(error);
		}
		else {
			disease_is_valid = true;
			population_is_valid = true;
		}

		if (disease_is_valid && population_is_valid) {

			const population = parseInt(population_string);
			let r_0 = 0;
			let effectiveness = 0;

			switch(disease) {
	    		case "pertussis":
	        		r_0 = 5.5;
	        		effectiveness = .80;
	        		break;
	    		case "diphtheria":
	        		r_0 = 6.5;
	        		effectiveness = .95;
	        		break;
	    		case "rubella":
	        		r_0 = 6;
	        		effectiveness = .95;
	        		break;
	        	case "polio":
	        		r_0 = 6;
	        		effectiveness = .99;
	        		break;
	        	case "mumps":
	        		r_0 = 5.5;
	        		effectiveness = .88;
	        		break;
	        	case "measles":
	        		r_0 = 15;
	        		effectiveness = .98;
	        		break;
	        	default: // influenza
	        		r_0 = 1.5;
	        		effectiveness = .6;
	        		break;
			}

			effectiveness_percent = Math.ceil(effectiveness*100);

			const coverage_needed = Math.ceil(((1-1/r_0)/effectiveness)*100);

			if (coverage_needed > 100) {
				const coverage_message = $('<li></li>').text("There is no way to grant herd immunity for " + disease + ".");
				$list.append(coverage_message);
			}
			else {
				const coverage_message = $('<li></li>').text("A vaccine coverage of about " + coverage_needed + "% is needed to grant herd immunity for " + disease + ".");
				$list.append(coverage_message);				
			}

			const population_needed = Math.ceil((coverage_needed/100)*population);

			if (population_needed > population) {
				const population_message = $('<li></li>').text("Even if every member of the population gets vaccinated, herd immunity cannot be ensured for " + disease + ".");
				$list.append(population_message);
			}
			else {
				const population_message = $('<li></li>').text("For a population of size " + population + ", approximately " + population_needed + " people must be vaccinated.");
				$list.append(population_message);		
			}

		}
	})

	$("#subbut2").on('click', function(event) {
		event.preventDefault();
		$list.empty();
		const disease = $('form input[type=radio]:checked').val();
		let disease_is_valid = false;
		const population_string = document.getElementById("population").value;
		let population_is_valid = false;
		const vaccinated_string = document.getElementById("vaccinated").value;
		let vaccinated_is_valid = false;

		if (disease == undefined || !/^[0-9]*$/.test(population_string) || population_string == "" || !/^[0-9]*$/.test(vaccinated_string) || vaccinated_string == "" || parseInt(population_string) < parseInt(vaccinated_string)) {
			const error = $('<li></li>').text("ERROR: Please ensure that all three fields have been filled out properly.");
			$list.append(error);
		}
		else {
			disease_is_valid = true;
			population_is_valid = true;
			vaccinated_is_valid = true;
		}

		if (disease_is_valid && population_is_valid && vaccinated_is_valid) {

			const population = parseInt(population_string);
			const vaccinated = parseInt(vaccinated_string);
			const proportion_vaccinated = (vaccinated/population);

			let r_0 = 0;
			let effectiveness = 0;

			switch(disease) {
	    		case "pertussis":
	        		r_0 = 5.5;
	        		effectiveness = .80;
	        		break;
	    		case "diphtheria":
	        		r_0 = 6.5;
	        		effectiveness = .95;
	        		break;
	    		case "rubella":
	        		r_0 = 6;
	        		effectiveness = .95;
	        		break;
	        	case "polio":
	        		r_0 = 6;
	        		effectiveness = .99;
	        		break;
	        	case "mumps":
	        		r_0 = 5.5;
	        		effectiveness = .88;
	        		break;
	        	case "measles":
	        		r_0 = 15;
	        		effectiveness = .98;
	        		break;
	        	default: // influenza
	        		r_0 = 1.5;
	        		effectiveness = .6;
	        		break;
			}

			const disease_incidence = Math.ceil(population*((1-(1/r_0))-(effectiveness*proportion_vaccinated)));

			const percent_incidence = Math.ceil((disease_incidence/population)*100)

			if (disease_incidence > 0) {
				const incidence_message1 = $('<li></li>').text("If " + vaccinated + " people are vaccinated in a population of " + population + ", there will be approximately " + disease_incidence + " cases of " + disease + ".");
				$list.append(incidence_message1);
				const incidence_message2 = $('<li></li>').text("In other words, about " + percent_incidence + "% of the population will contract " + disease + ".");
				$list.append(incidence_message2);				
			}
			else {
				const incidence_message1 = $('<li></li>').text("If " + vaccinated + " people are vaccinated in a population of " + population + ", there will be no cases of " + disease + ".");
				$list.append(incidence_message1);
				const incidence_message2 = $('<li></li>').text("The herd immunity threshold has been reached!");
				$list.append(incidence_message2);							
			}

		}
	})
})