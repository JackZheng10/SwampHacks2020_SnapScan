let programs = [];
/*programs.push(require('./holder/City_of_Gainesville_Small_Business'));
programs.push(require('./holder/Palm_Beach_County_Small_Business.json'));
programs.push(require('./holder/State_of_Florida_OSD_Veteran-Owned_Business_Enterprise.json'));
programs.push(require('./holder/State_of_Florida_OSD_Women-Owned_Business_Enterprise.json'));
programs.push(require('./holder/State_of_Florida_OSD_Minority-Owned_Business_Enterprise.json'));
*/
let matchPolicy = {
    /*
    The policies decide how each field will be matched, and the comments are used when displaying fuzzy fields that the user could conceivably qualify for in the future.
    stringExactMatch: match two strings exactly
    stringIncludeMatch: check if that program field includes the user's input
    arrayMatch: check if the array includes user's input
	locationObjectMatch: check if user's locations are present in program's location arrays
    trueFalseMatch: compare true or false for the same field
	trueFalseMatch51: same, but different comments for outputting courses of action the user can take
	trueFalseMatchHQ: same, but different comments for outputting courses of action the user can take
    quantityUnder: check if the user's input is less than the requirement
    quantityUnderOrEqual: check if the user's input is less or equal to the requirement
    quantityBeyond: check if the user's input is greater than the requirement
    quantityBeyondOrEqual: check if the user's input is greater or equal to the requirement
    quantityEqual: check if the user's input is equal to the requirement
    unrelated: regard the field as unrelated for the eligibility
    */

    stringExactMatch:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requiremnt'
            };
        else if(user.toUpperCase() === program.toUpperCase())
            return {
                eligibility:true,
                comment:'matched'
            };
        else
            return {
                eligibility:false,
                //comment:'not matched'
				comment:'have an office in '+program
            };
    },
    stringIncludeMatch:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requiremnt'
            };
        else if(program.toUpperCase().indexOf(user.toUpperCase()!=1))
        {
            return {
                eligibility:true,
                comment:'included'
            };

        }

        else
            return {
                eligibility:false,
                comment:'not included'
            };
    },
    arrayMatch:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requiremnt'
            };
        else if(program.map(function(x){ return x.toUpperCase()}).includes(user.toUpperCase()))
            return {
                eligibility:true,
                comment:'included'
            };
        else if(program.some(function(x){ return x.toUpperCase().indexOf('ALL')!=-1})) {
            return {
                eligibility:true,
                comment:'included since ALL'
            };
        }
        else
			var programAsString = program.join(', ');
            return {
                eligibility:false,
                //comment:'not included'
				comment:'be certified in: '+programAsString
            };
    },
    locationObjectMatch: (user, program) => {
        const matchedLocations = user.map(location => {
            return Object.keys(program).map((key) => {
                if(typeof program[key] === "string") { //the state

                    if(program[key].toLowerCase() === location[key].toLowerCase()) {
                        return true;
                    }
                    return false;
                }
                else if(typeof program[key] === "object") { //city and county (arrays are type "object")
                    if(program[key][0].includes("All counties in: ")) {
                        let testArray = program[key].join(",").substr(17).toLowerCase().split(",");

                        if(testArray.includes(location.state.toLowerCase())) {
                            return true;
                        }
                    }
                    if(program[key][0].toLowerCase().includes("All cities in: ".toLowerCase())) {
                        let testArray = program[key].join(",").substr(15).toLowerCase().split(",");

                        if(testArray.includes(location.county.toLowerCase()) || testArray.includes(location.state.toLowerCase())) {
                            return true;
                        }
                    }

                    //else regular check is the value in the array
                    return program[key]
                        .some(cityOrCounty => {
                            return cityOrCounty.toLowerCase() === location[key].toLowerCase()
                        })
                    
                }
            })
        })
        
        let counter = 0;
        let isEligibile = false;
        //this is begging to be transformed into a .some (i.e. break on true)
        matchedLocations.map((location, index) => {
            if(!location.includes(false)) isEligibile = true;
        })
        if(isEligibile) {
			if (program.city[0].toLowerCase().includes("all") && !(program.county[0].toLowerCase().includes("all"))) {
				let counties = program.county.join(', ');
				return {
					eligibility: true,
					comment: 'have an office in: ' + counties +' County, ' + program.state
				}
				
			}
			else if (program.county[0].toLowerCase().includes("all")) {
				return {
					eligibility: true,
					comment: 'have an office in: ' + program.state
				}
			}
			else {
				let counties = program.county.join(', ');
				let cities = program.city.join(', ');
				return {
					eligibility: true,
					comment: 'have an office in: ' + cities +' City, ' + counties + ' County, ' + program.state
				}
			}
		}
            
         else {
			if (program.city[0].toLowerCase().includes("all") && !(program.county[0].toLowerCase().includes("all"))) {
				let counties = program.county.join(', ');
				return {
					eligibility: false,
					comment: 'have an office in: ' + counties +' County, ' + program.state
				}
			}
			else if (program.county[0].toLowerCase().includes("all")) {
				return {
					eligibility: false,
					comment: 'have an office in: ' + program.state
				}
			}
			else {
				let counties = program.county.join(', ');
				let cities = program.city.join(', ');
				return {
					eligibility: false,
					comment: 'have an office in: ' + cities +' City, ' + counties + ' County, ' + program.state
				}
			}
        }
    },
    trueFalseMatchHQ:(user,program,programLoc) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requirement'
            };
        else if(typeof user !== "boolean") {
            return {
                eligibility:true,
                comment:'not certain'
            };
        }
        else {
			if(program==false)
				return {
					eligibility:true,
					//comment:'user input does not match with the requirement'
					comment:'no specific headquarters requirement'
				};
			else if (program==true && user == true)
				return {
					eligibility:true,
					//comment:'user input does not match with the requirement'
					comment:'headquarters office is in correct location'
				};
			else {
				if (programLoc.city[0].toLowerCase().includes("all") && !(programLoc.county[0].toLowerCase().includes("all"))) {
					let counties = programLoc.county.join(', ');
					return {
						eligibility: false,
						comment: 'have a headquarters office in: ' + counties +' County, ' + programLoc.state
					};
				}
				else if (programLoc.county[0].toLowerCase().includes("all")) {
					return {
						eligibility: false,
						comment: 'have a headquarters office in: ' + programLoc.state
					};
				}
				else {
					let counties = programLoc.county.join(', ');
					let cities = programLoc.city.join(', ');
					return {
						eligibility: false,
						comment: 'have a headquarters office in: ' + cities +' City, ' + counties + ' County, ' + programLoc.state
					};
				}
			}
		}
	},
				
	trueFalseMatch:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requirement'
            };
        else if(typeof user !== "boolean") {
            return {
                eligibility:true,
                comment:'not certain'
            };
        }
        else if(user===program)
            return {
                eligibility:true,
                comment:'true'
            };
        else
            return {
                eligibility:false,
                comment:'user input does not match with the requirement'
            };
    },
	trueFalseMatch51:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requirement'
            };
        else if(user===program)
            return {
                eligibility:true,
                comment:'true'
            };
		else if (user === true && program === false) {
			return {
				eligibility: true,
				comment: 'true'
			};
		}
		else if(typeof program === 'string' && program.toUpperCase().includes("VARIABLE")) {
			return {
				eligibility: false,
				comment:'have 51% or more of your company owned by: ' + program + '@VARIABLE'
			};
		}
        else
            return {
                eligibility:false,
                comment:'have 51% or more of your company owned by '
            };
    },
    quantityUnder:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requiremnt'
            };
        else if(user<program)
            return {
                eligibility:true,
                comment:'quantity is under maximum'
            };
		else if(typeof program === 'string' && program.toUpperCase().includes("VARIABLE")) {
			return {
				eligibility: false,
				comment:'have a net worth of less than: '+program+' (you currently have: '+user+')@VARIABLE'
			};
		}
        else
            return {
                eligibility:false,
                //comment:'quantity is '+(user-program)+ ' equal or greater to the maximum'
				comment:'have a net worth of less than: '+program+' (you currently have: '+user+')'
            };
    },
    quantityUnderOrEqual:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requiremnt'
            };
        else if(user<=program)
            return {
                eligibility:true,
                comment:'quantity is under or equal to the maximum'
            };
		else if(typeof program === 'string' && program.toUpperCase().includes("VARIABLE")) {
			return {
				eligibility: false,
			   comment:'have '+program+' or fewer employees (you currently have: '+user+')@VARIABLE'
			};
		}
        else
            return {
                eligibility:false,
               // comment:'quantity is '+(user-program)+' greater to the maximum'
			   comment:'have '+program+' or fewer employees (you currently have: '+user+')'
            };
    },
    quantityBeyondOrEqual:(user,program) => {
        if(program==='N/A')
            return {
                eligibility:true,
                comment:'no requiremnt'
            };
        else if(user>=program)
            return {
                eligibility:true,
                comment:'quantity is greater or equal to the minimum'
            };
		else if(typeof program === 'string' && program.toUpperCase().includes("VARIABLE")) {
			return {
				eligibility: false,
                comment:'have been in business for '+program+ ' years or more (you have been in business for '+user+ ' years)@VARIABLE'
			};
		}
        else
            return {
                eligibility:false,
                comment:'have been in business for '+program+ ' years or more (you have been in business for '+user+ ' years)'
            };
    },
    unrelated:(user,program) => {
        return {
            eligibility:true,
            comment:'this is a unrelated field'
        }
    },

};
// Assign each field with one matching policy
let assignPolicy =
{
    "title": matchPolicy.unrelated,
    "benefits": matchPolicy.unrelated,
	"opportunities": matchPolicy.unrelated,
    "certState": matchPolicy.unrelated,
    "certCounty": matchPolicy.unrelated,
    "certCity": matchPolicy.unrelated,
    "forProfit": matchPolicy.trueFalseMatch,
    "commercialTransactions": matchPolicy.trueFalseMatch,
    "businessTime":matchPolicy.quantityBeyondOrEqual,
    "netWorth": matchPolicy.quantityUnder,
   // "officeState": matchPolicy.unrelated,
    "registeredState": matchPolicy.trueFalseMatch,
   // "officeCounty": matchPolicy.unrelated,
   // "officeCity": matchPolicy.unrelated,
    "ownedByResident": matchPolicy.trueFalseMatch,
    "ftEmployees": matchPolicy.quantityUnderOrEqual,
    "Citizens": matchPolicy.trueFalseMatch51,
    "permResidents": matchPolicy.trueFalseMatch51,
    "Veterans": matchPolicy.trueFalseMatch51,
    "Women": matchPolicy.trueFalseMatch51,
    "African_American": matchPolicy.trueFalseMatch51,
    "Asian_American": matchPolicy.trueFalseMatch51,
    "Hispanic_American": matchPolicy.trueFalseMatch51,
    "Native_American": matchPolicy.trueFalseMatch51,
	"Minorities": matchPolicy.trueFalseMatch51,
    "otherReqs": matchPolicy.unrelated,
    "learnMore": matchPolicy.unrelated,
    "appToolAvailable": matchPolicy.unrelated,
    "classification": matchPolicy.unrelated,
	"officeLocation": matchPolicy.locationObjectMatch,
	"hqReq": matchPolicy.trueFalseMatchHQ

}
class User {
    constructor(userinput) {
        this.userInput = userinput;
        this.matchAll();
    }
     matchOne(program) { //matches a single program at a time(from matchAll())
        let matchResult = {
            title:program["title"],
			hqReq:program["hqReq"],
			benefits:program["benefits"],
			otherReqs:program["otherReqs"],
			//officeCounty:program["officeCounty"],
			officeLocation:program["officeLocation"],
			businessTime:program["businessTime"],
			opportunities:program["opportunities"],
			learnMore:program["learnMore"],
            eligibility:false,
            comment: '',
            details: {

            },
            matchedFields:[],
            unmatchedFields:[], //fields that are not designated fuzzy and don't match the user's input
			fuzzyFields:[] //fields that ARE designated fuzzy and don't match the user's input
        };
        let out = this;
		let minorities = false;
        Object.keys(program).forEach(function(key) { //for each key (ie "title") in the program...
			if (program["Asian_American"] && program["African_American"] && program["Hispanic_American"] && program["Native_American"]) { //workaround to avoid client excel changes; recognizes if a program requires just ANY minority vs requiring all of them
				program["Minorities"] = true; 
				program["Asian_American"] = false;
				program["African_American"] = false;
				program["Hispanic_American"] = false;
				program["Native_American"] = false;
			}
			let s = assignPolicy[key](out.userInput[key],program[key]); //calls actual matching
            s.feildName = key;
            matchResult.details[key] = s;
			if (key == 'hqReq' && program['hqReq']) { //for processing special case hq; workaround to avoid mass changes to existing code and client materials
				s.eligibility = false;
			}
			else if (key === 'officeLocation') { //for processing special case hq as well as filtering results per user request
				if(!(program['officeLocation']['state'] === out.userInput['certState'])) {
					s.eligibility = false;
				}
				else if (out.userInput['certCounty'] != undefined && !((matchPolicy.arrayMatch(out.userInput['certCounty'], program['officeLocation']['county'])).eligibility)) {
					s.eligibility = false;
				}
				else if (out.userInput['certCity'] != undefined && !((matchPolicy.arrayMatch(out.userInput['certCity'], program['officeLocation']['city'])).eligibility)) {
					s.eligibility = false;
				}
				else {
				}
				if (s.eligibility == true) { //special case hq
					matchResult.fuzzyFields.map((field, index) => {
						if (field.feildName == 'hqReq') {
							field = matchPolicy.trueFalseMatchHQ(out.userInput['officeLocation'].isHQ, program['hqReq'],program['officeLocation']);
							if(field.eligibility) {
								matchResult.fuzzyFields.splice(index,1);
								matchResult.matchedFields.push(field);
							}
							else {
								matchResult.fuzzyFields.splice(index, 1);
								matchResult.fuzzyFields.push(field);
							}
						}
					});
				}
			}
			else if (key === 'Women' || key === 'African_American' || key === 'Hispanic_American' || key === 'Native_American') { //sets minorities true so long as any minority is true for matching purposes
				if (s.eligibility) {
					minorities = true;
				}
			}
			else if (key === 'Minorities' && minorities) { //another minority workaround
				s.eligibility = true;
				out.userInput['Minorities'] = true;
			}
			else if (key === 'Citizens' && s.eligibility == true) { //permResidents qualifier is automatically true if Citizens qualifier is true, per client request
				out.userInput['permResidents'] = true;
			}
			else {
			}
            if(s.eligibility) //if the key matches...
                matchResult.matchedFields.push(s);
            else { //otherwise sort into unmatched and fuzzy
				if(!(key==="certCity" || key === "certState" || key === "certCounty" || key==="officeLocation" || (key==="hqReq"&&program.hqReq===true) || key=== "commercialTransactions" || (key === "businessTime" && (user.businessTime < program.businessTime)) || (s.comment.includes("VARIABLE")))) {
					matchResult.unmatchedFields.push(s);
				}
				if(key==="certCity" || key === "certState" || key === "certCounty" || key==="officeLocation" || (key==="hqReq"&&program.hqReq===true) || key=== "commercialTransactions" || (key === "businessTime" && (user.businessTime < program.businessTime)) || (s.comment.includes("VARIABLE"))) {
					matchResult.fuzzyFields.push(s);
				}
			}
        });
        if(matchResult.unmatchedFields.length===0 && matchResult.fuzzyFields.length === 0) //result is eligible only if ALL fields are matched, including fuzzy fields
            matchResult.eligibility = true;
        else
            matchResult.eligibility = false;
        return matchResult;
    }
    matchAll() { //go through each program and match with user input
        let programs = User.programs;
        this.qualifiedPrograms = [];
        this.unqualifiedPrograms = [];
        for(let program of programs) {
            let singleResult = this.matchOne(program);
            if(singleResult.eligibility)
                this.qualifiedPrograms.push(singleResult); //qualified programs contain ONLY programs in which all fields match the users'
            else
                this.unqualifiedPrograms.push(singleResult); //unqualified programs contains both "fuzzy" programs (with fuzzy fields and NO unmatched fields) and completely unqualified programs
        }
    }
    generalInfo() { //for testing purposes
        let info = 'There are '+this.qualifiedPrograms.length+ ' eligible programs'+'<br/>';
        for(let pro of this.qualifiedPrograms) {
            info+=pro.title+'<br/>';
        }
        info+='There are '+this.unqualifiedPrograms.length+' ineligible programs'+'<br/>'
        for(let pro of this.unqualifiedPrograms) {
            info+=pro.title+'<br/>'+'ineligible reasons:'+'<br/>';
            for(let field of pro.unmatchedFields) {
                info+='&nbsp&nbsp&nbsp&nbsp'+field.feildName+': '+field.comment+'<br/>';
            }
        }
        return info;

    }
	formatInfo() { //for testing purposes
		
    let info="";

		if(this.qualifiedPrograms.length>0)
			info += 'Badish news!<br/><br/>Based on your results, it looks like you are eligible for the following certifications and programs. Please use the learn more links to double check your eligibility.<br/><br/>';
		for(let pro of this.qualifiedPrograms) {
			info+='<b>' + pro.title+'</b><br/><br/>';
			info+='Please note that beyond the answers you provided, to be eligible for this certification, you:<ul>';
			var otherReqs = pro.otherReqs.split("    ");
			otherReqs.forEach(req => info+='<li>'+req+'</li>');
			info+='</ul>';
			info+='<b>What are the business opportunities related to this certification?</b><br/>';
			info+= pro.opportunities + '<br/><br/>';
			info+='<b>What are the benefits of pursuing this certification?</b><br/><ul>';
			var courtesy = pro.benefits.substring(0,pro.benefits.indexOf("    ")).toLowerCase();
			var benefits = pro.benefits.substring(pro.benefits.indexOf("    "));
			var benefitsSplit = benefits.split(".    ");    
			benefitsSplit.forEach(benefit => info+='<li>'+benefit+'</li>');
			info+='</ul>';
			info+='All benefits of the certification are '+courtesy+'<br/><br/>';
			info+='<b>Learn more: '+pro.learnMore+'</b><br/><br/>';
			//info+='Make a way to check for if have application on website<br/><br/>------------------------<br/><br/>';
			info += '<br/><br/>------------------------<br/><br/>';
	    }
		var fuzzyExist=false;
		for (let pro of this.unqualifiedPrograms)
		{
			if(pro.fuzzyFields.length > 0 && pro.fuzzyFields.length===pro.unmatchedFields.length)
				   fuzzyExist=true;
		}
	    if(fuzzyExist)
		    info+='<b>With a little more, you can also reach for these certifications.</b><br/><br/>';
		for(let pro of this.unqualifiedPrograms) {
			if(fuzzyExist) {
				info+='<b>'+pro.title+'</b><br/><br/>';
				info+='You almost match for this certification. In order to be eligible, you would need to:<ul>';
				for(let field of pro.fuzzyFields) {
					info+='<li>'+field.comment+'</li>';
				}
				info+='</ul>';
				info+='Please note that beyond the answers you provided, to be eligible for this certification, you:<ul>';
				var otherReqs = pro.otherReqs.split("    ");
				otherReqs.forEach(req => info+='<li>'+req+'</li>');
				info+='</ul>';			
				info+='<b>What are the business opportunities related to this certification?</b><br/>';
				info+= pro.opportunities + '<br/><br/>';
				info+='<b>What are the benefits of pursuing this certification?</b><br/><ul>';
				var courtesy = pro.benefits.substring(0,pro.benefits.indexOf("    ")).toLowerCase();
				var benefits = pro.benefits.substring(pro.benefits.indexOf("    "));
				var benefitsSplit = benefits.split(".    ");     
				benefitsSplit.forEach(benefit => info+='<li>'+benefit+'</li>');
				info+='</ul>';
				info+='All benefits of the certification are '+courtesy+'<br/><br/>';
				info+='<b>Learn more: '+pro.learnMore+'</b><br/><br/>';
				//info+='Make a way to check for if have application on website<br/><br/>------------------------<br/><br/>';
				info += '<br/><br/>------------------------<br/><br/>';
			}  
		}
		info+='Debug: <br/>'
				for(let pro of this.unqualifiedPrograms) {
					info+=pro.title+'<br/>'+'ineligible reasons:'+'<br/>';
					for(let field of pro.unmatchedFields) {
						info+='&nbsp&nbsp&nbsp&nbsp'+field.feildName+': '+field.comment+'<br/>';
					}
				}
		//how to: better format 51x qualifier, remove superfluous requirements, N/A? fields in json documents bad
		return info;
    }
	realInfo() { 
		let user = this.userInput;
		const result = { //sent to eligibility.js -> Results.jsx for PDF display
            title: [],
			textTitle: '',
			textFrontSubtitle: '',
            eligPrograms : [],
			fuzzPrograms : [],
			userListPreloc: [],
			locList: [],
			userListPostloc: [],
			minorityList: [],
			summaryTable: []
        }
		//The following is for the first three pages of the PDF, which come before any program
		//First: front page, which contains a dynamic date, calculated here
		let dateArray = ['January','February','March','April','May','June','July','August','September','October','November','December']
		let date = new Date();
		result.textFrontSubtitle = 'Eligibility Report - ' + dateArray[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		
		//Second: user input summary
		if (user.forProfit) {
			result.userListPreloc.push('√  Is a for-profit organization');
		}
		else {
			result.userListPreloc.push('√  Is a non-profit organization');
		}
		result.userListPreloc.push('√  Has a net worth of $' + this.userInput.netWorth);
		result.userListPreloc.push('√  Has an office location in:');
		for (let pro of user.officeLocation) {
			if (pro.isHQ) {
				result.locList.push('–  ' + pro.city + ', ' + pro.state + ' (HQ location)');
			}
			else {
				result.locList.push('–  ' + pro.city + ', ' + pro.state);
			}
		}
		if (user.commercialTransactions) {
			result.userListPostloc.push('√  Is currently engaged in commercial transactions');
		}
		else {
			result.userListPostloc.push('√  Is not currently engaged in commercial transactions');
		}
		result.userListPostloc.push('√  Has ' + user.ftEmployees + ' full-time employees');
		result.userListPostloc.push('√  Has been operating for ' + user.businessTime + ' or fewer years');
		result.userListPostloc.push('√  Is 51% or more owned by:');
		if (user.Citizens) {
			result.minorityList.push('–  US Citizens');
		}
		if (user.Veterans) {
			result.minorityList.push('–  Veterans');
		}
		if (user.Women) {
			result.minorityList.push('–  Women');
		}
		if (user.Minorities) {
			let word = 'Minorities (';
			let addCount = 0;
			let lastMinority = '';
			if (user.African_American) {
				word = word+'African-American, ';
				addCount++;
				lastMinority = 'African-American';
			}
			if (user.Asian_American) {
				lastMinority = 'Asian-American';
				word = word+'Asian-American, ';
				addCount++;
			}
			if (user.Hispanic_American) {
				lastMinority = 'Hispanic-American'
				word = word+'Hispanic-American, ';
				addCount++;
			}
			if (user.Native_American) {
				lastMinority = 'Native-American';
				word = word+'Native-American, ';
				addCount++;
			}
			//following allows minorities to display neatly with commas between them, removing the comma from the last minority
			word = word.substring(0, word.indexOf(lastMinority)+(lastMinority.length));
			word = word+')'
			result.minorityList.push('–  ' + word);
		}
		//third: eligibility summary table. Goes through each program and determines if the user is eligible, almost eligible (fuzzy), or ineligible to apply
		for(let pro of User.programs) {
			let table = {
				programName: '',
				programEligibility: ''
			}
			let qualifiedIndicator = false;
			let fuzzyIndicator = false;
			this.qualifiedPrograms.map((program, index) => {
				if (program.title.includes(pro.title)) {
					return qualifiedIndicator = true;
				}
			});
			this.unqualifiedPrograms.map((program, index) => {
				if (program.title.includes(pro.title)) {
					if (program.fuzzyFields.length > 0 && program.unmatchedFields == 0) {
						return fuzzyIndicator = true;
					}
				}
			});
			table.programName = pro.title;
			if (qualifiedIndicator && !(pro.otherReqs.includes('N/A'))) {
				table.programEligibility = 'Yes*';
			}
			else if (qualifiedIndicator) {
				table.programEligibility = 'Yes';
			}
			else if (!qualifiedIndicator && fuzzyIndicator) {
				table.programEligibility = 'Not yet, but soon!';
			}
			else {
				table.programEligibility = 'No';
			}
			result.summaryTable.push(table);
		}
		//The remaining pages contain all of the programs the user is eligible for or almost eligible for
		if(this.qualifiedPrograms.length>0) { //if there are ANY qualified programs, proceeds with processing the header and all qualified programs

			result.title.push('Good news!');
			result.textTitle = 'Based on your results, it looks like you are eligible for the following certifications and programs. Please use the learn more links to double check your eligibility.';
			
			for(let pro of this.qualifiedPrograms) { //each program consists of these fields for PDF display
				let prog = {
					title: '',
					headerOpps: '',
					headerBenefits: '',
					headerLearnMore: '',
					textReqs: '',
					textOpps: '',
					textBenefits: '',
					listBenefits: [],
					listReqs: [],
					linkBenefits: '',
					linkLearn: ''
				};
				prog.title = pro.title;
				prog.textReqs = 'Please note that beyond the answers you provided, to be eligible for this certification, you:';
				var otherReqs = pro.otherReqs.split(/\s{2,}/g); //to avoid altering client resources (excel spreadsheet), requirements are split when there are two or more spaces in between words. (commonly '.  ', '    ', or ';    ')
				otherReqs.forEach(req => {prog.listReqs.push('•  ' + req);}); //creates a bulleted list
				prog.headerOpps = 'What are the business opportunities related to this certification?';
				prog.textOpps = pro.opportunities;
				prog.headerBenefits = 'What are the benefits of pursuing this certification?';
				var courtesy = pro.benefits.substring(pro.benefits.indexOf('f')+2,pro.benefits.indexOf("    ")).toLowerCase();//extracts the 'all benefits of the certification are courtesy of...' from the benefits program field
				var benefits = pro.benefits.substring(pro.benefits.indexOf("    ")+4);//removes the 'all benefits of the certification are courtesy of...' before making list. 
				var benefitsSplit = benefits.split(/\s{2,}/g); //same method of splitting as before for the same reason   
				benefitsSplit.forEach(benefit => {prog.listBenefits.push('•  ' + benefit);});
				prog.textBenefits = 'All benefits of the certification are courtesy of ';
				prog.linkBenefits = courtesy;
				prog.headerLearnMore = 'Learn more: ';
				prog.linkLearn=pro.learnMore;
			   // info+='Make a way to check for if have application on website<br/><br/>------------------------<br/><br/>';
				result.eligPrograms.push(prog);
			}
		}
		let fuzzys = false;
		this.unqualifiedPrograms.map((program,index) => {if(program.fuzzyFields.length>0 && program.unmatchedFields.length ==0) return fuzzys=true;}); //fuzzys is true if there are any 'almost eligible' programs, to allow for the 'no programs match' text if needed
		if(fuzzys) {
				result.title.push('With a little more, you can reach for these certifications.');			
			for(let pro of this.unqualifiedPrograms) { //unqualified programs contain all of the same fields as qualified ones with the addition of listFuzzy and textElig, which list out what actions the user needs to take to qualify
				let prog = {
					title: '',
					headerOpps: '',
					headerBenefits: '',
					headerLearnMore: '',
					textElig: '',
					textReqs: '',
					textOpps: '',
					textBenefits: '',
					listBenefits: [],
					listReqs: [],
					listFuzzy: [],
					linkBenefits: '',
					linkLearn: ''
				};
				if(pro.fuzzyFields.length > 0 && pro.unmatchedFields.length==0) { //if the program is fuzzy...
					prog.title = pro.title;
					prog.textElig = 'You almost match for this certification. In order to be eligible, you would need to:';
					for(let field of pro.fuzzyFields) {
						if (field.comment.includes("VARIABLE")) { //allows formatting change for when the program has a field that is stated to be 'Variable' by client, for ease of reading
							prog.listFuzzy.push('•  ' + field.comment.substring(0,field.comment.indexOf("@")));
						}
						else {
							prog.listFuzzy.push('•  ' + field.comment);

						}
					}
					prog.textReqs = 'Please note that beyond the answers you provided, to be eligible for this certification, you:';
					var otherReqs = pro.otherReqs.split(/\s{2,}/g); //same splitting as above
					otherReqs.forEach(req => {prog.listReqs.push('•  ' + req);});
					prog.headerOpps = 'What are the business opportunities related to this certification?';
					prog.textOpps = pro.opportunities;
					prog.headerBenefits = 'What are the benefits of pursuing this certification?';
					var courtesy = pro.benefits.substring(pro.benefits.indexOf('f')+2,pro.benefits.indexOf("    ")).toLowerCase();
					var benefits = pro.benefits.substring(pro.benefits.indexOf("    ")+4);
					var benefitsSplit = benefits.split(/\s{2,}/g);    
					benefitsSplit.forEach(benefit => {prog.listBenefits.push('•  ' + benefit);});
					prog.textBenefits = 'All benefits of the certification are courtesy of ';
					prog.linkBenefits = courtesy;
					prog.headerLearnMore = 'Learn more: ';
					prog.linkLearn=pro.learnMore;
					result.fuzzPrograms.push(prog);			
				}
			}
		}
		if (this.qualifiedPrograms.length == 0 && !fuzzys) { //if there are no qualified programs or almost qualified programs...
			result.title.push('Oops! None of our programs match your criteria.');
		}
        return result;
	}
	databaseInfo() {
		//console.log(programs);
		return {
			user: this.userInput,
			qualified: this.qualifiedPrograms,
			unqualified: this.unqualifiedPrograms,
			programInfo: programs
		}
	}
    getAllEligiblePrograms() {
        return this.qualifiedPrograms;
    }
    getAllNotEligiblePrograms() {
        return this.unqualifiedPrograms;
    }

}
User.programs = programs;
module.exports = User;