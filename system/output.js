// OUTPUT.JS http://www.mat-o-wahl.de
// Output of information / Ausgabe der Informationen
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

var arExplanations = new Array(); // Globales Array für die Frage-Erklärungen

// Überschreibt den CSV-Parser, um die neue Spalte an Index 2 auszulesen
function fnTransformCsvToArray(csvData) {
	var lines = $.csv.toArrays(csvData, {separator: ';'});
	arCategories = [];
	arQuestionsLong = [];
	arExplanations = [];
	arAnswers = [];
	
	for (var i = 1; i < lines.length; i++) {
		var row = lines[i];
		if (row.length < 2 || row[0].trim() === "") continue;
		
		arCategories.push(row[0]);
		arQuestionsLong.push(row[1]);
		arExplanations.push(row[2] ? row[2].trim() : "");
		
		var currentAnswers = [];
		// Antworten starten jetzt bei Index 3 (wegen der Erklärung auf Index 2)
		for (var j = 3; j < row.length; j += 2) {
			if (row[j] && row[j].trim() !== "") {
				currentAnswers.push({
					text: row[j],
					weight: parseInt(row[j+1]) || 0
				});
			}
		}
		arAnswers.push(currentAnswers);
	}
	totalQuestions = arAnswers.length;
}

function fnStart() {
	$("#sectionShowQuestions").hide();
	$("#sectionVotingButtons").hide();
	$("#sectionResults").hide();
	
	// Lade deine CSV-Datei mit den Fragen
	fnReadCsv("data/fragen_judge_fileformat-06-samplelines.csv", function(csvData) {
        fnTransformCsvToArray(csvData);
        $("#descriptionExplanation").empty().append("");
    });
}

function fnHideWelcomeMessage() { 
	// Auslesen und Speichern des eingegebenen Formats
	selectedFormatName = $("#formatNote").val().trim();
	if (selectedFormatName === "") {
		selectedFormatName = "unbenanntes Format"; // Fallback, falls nichts eingegeben wurde
	}
	
	$('#sectionDescription').hide().empty();
	fnShowQuestionNumber(-1);	
}

function fnShowQuestionNumber(questionNumber) {
	questionNumber++;
	
	if (questionNumber < totalQuestions) {
		activeQuestion = questionNumber; 
		
		$("#sectionShowQuestions").fadeOut(300).hide();		
        $("#showQuestionsHeader").empty().append("<h2>Kategorie: " + arCategories[questionNumber] + "</h2>");
        $("#showQuestionsQuestion").empty().append(arQuestionsLong[questionNumber]);			
		
		// ERKLÄRUNG ANZEIGEN ODER AUSBLENDEN
		if (arExplanations[questionNumber] && arExplanations[questionNumber] !== "") {
			$("#showQuestionsExplanation").empty().append(arExplanations[questionNumber]).show();
		} else {
			$("#showQuestionsExplanation").empty().hide();
		}

		$("#sectionShowQuestions").fadeIn(300);

		$("#sectionVotingButtons").fadeOut(300).hide();
        
        // Dynamische Buttons für diese Frage generieren
        $("#dynamicVotingButtons").empty();
        let currentAnswers = arAnswers[questionNumber];
        
        for(let i=0; i < currentAnswers.length; i++) {
            let btnCol = $("<div class='col mt-2'></div>");
            let btn = $("<button type='button' class='btn btn-primary btn-lg btn-block'></button>")
                .text(currentAnswers[i].text)
                .click(function() {
                    arPersonalPositions[questionNumber] = { 
                        text: currentAnswers[i].text, 
                        weight: currentAnswers[i].weight 
                    };
                    fnShowQuestionNumber(questionNumber);
                });
            btnCol.append(btn);
            $("#dynamicVotingButtons").append(btnCol);
        }

		$("#sectionVotingButtons").fadeIn(300);

	} else {
		// Auswertung
		let resultsObj = fnEvaluation();
		fnEvaluationCategories(resultsObj);
	} 
}

function fnEvaluationCategories(resultsObj) {
	// WICHTIG: Vorherige Inhalte leeren, damit bei einer Änderung nichts doppelt angehängt wird
	$("#resultsShort").empty();
	$("#resultsDetailed").empty();

	// Nutzt den dynamischen Namen in der Überschrift
	$("#resultsHeading").empty().append("<h1>Auswertung zu: " + selectedFormatName + "</h1>").fadeIn(500);

	var tableContent = "<div class='row' role='table'><div class='col'>";

    // 1. KATEGORIEN-BALKEN GENERIEREN
    for (const cat in resultsObj.max) {
        let maxPoints = resultsObj.max[cat];
        let achievedPoints = resultsObj.scores[cat];
        let percent = fnPercentage(achievedPoints, maxPoints);
        let barClass = fnBarImage(percent);

        tableContent += "<div class='border rounded mow-row-striped p-3 mb-2' role='row'>";
        tableContent += "<div class='row'>";
        
        tableContent += "<div class='col col-12 col-md-4' role='cell'>";
        tableContent += "<strong>Kategorie: " + cat + "</strong>";
        tableContent += "</div>";

        tableContent += "<div class='col col-12 col-md-8' role='cell'>";
        tableContent += "<div class='progress' style='height: 30px;'>";
        tableContent += "<div class='progress-bar " + barClass + "' role='progressbar' style='width:"+percent+"%;' aria-valuenow='"+percent+"' aria-valuemin='0' aria-valuemax='100'>";
        tableContent += percent + "% (" + achievedPoints + " / " + maxPoints + " Punkte)";
        tableContent += "</div></div></div>";

        tableContent += "</div></div>";
    }

	tableContent += "</div></div>";
	$("#resultsShort").append(tableContent);

	// 2. DETAIL-ÜBERSICHT MIT INTERAKTIVEN DROPDOWNS GENERIEREN
	var detailedContent = "<h2>Detaillierte Antwortübersicht (nachträgliche Änderung möglich)</h2>";
	detailedContent += "<div class='table-responsive mt-3'>";
	detailedContent += "<table class='table table-bordered table-striped'>";
	detailedContent += "<thead class='thead-dark'><tr><th style='width: 15%;'>Kategorie</th><th style='width: 45%;'>Frage</th><th style='width: 30%;'>Deine Antwort</th><th style='width: 10%;'>Punkte</th></tr></thead>";
	detailedContent += "<tbody id='detailedTableBody'></tbody></table></div>";

	$("#resultsDetailed").append(detailedContent);

	for (let i = 0; i < totalQuestions; i++) {
		let cat = arCategories[i];
		let question = arQuestionsLong[i];
		let currentAnswerText = arPersonalPositions[i].text;
		let answerWeight = arPersonalPositions[i].weight;

		let row = $("<tr></tr>");
		row.append($("<td></td>").text(cat));
		row.append($("<td></td>").text(question));

		let tdAnswer = $("<td></td>");
		let selectEl = $("<select class='form-control form-control-sm'></select>");
		
		for (let j = 0; j < arAnswers[i].length; j++) {
			let opt = $("<option></option>").val(j).text(arAnswers[i][j].text);
			if (arAnswers[i][j].text === currentAnswerText) {
				opt.attr("selected", "selected");
			}
			selectEl.append(opt);
		}

		selectEl.change(function() {
			let selectedIdx = $(this).val();
			arPersonalPositions[i] = {
				text: arAnswers[i][selectedIdx].text,
				weight: arAnswers[i][selectedIdx].weight
			};
			let updatedResults = fnEvaluation();
			fnEvaluationCategories(updatedResults);
		});

		tdAnswer.append(selectEl);
		row.append(tdAnswer);
		row.append($("<td></td>").addClass("font-weight-bold text-center").text(answerWeight));

		$("#detailedTableBody").append(row);
	}

	$("#resultsDetailed").show();
	$("#sectionResults").show();
}