using System.Runtime.InteropServices.JavaScript;
using sulfone_helium;
using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.Questions;

CyanEngine.StartTemplate(
    args,
    async Task<Cyan> (inquirer, determinism) =>
    {
        var name = await inquirer.Text("What is your name?", "q1");
        var age = await inquirer.Text(
            new TextQ
            {
                Validate = x =>
                {
                    try
                    {
                        _ = int.Parse(x);
                        return "";
                    }
                    catch
                    {
                        return "Needs to be a number";
                    }
                },
                Message = "What is your age?",
                Id = "q2",
                Default = "20",
                Desc = "The age of the person",
                Initial = "18",
            }
        );

        var food = await inquirer.Checkbox(
            "What is your food?",
            ["apple", "orange", "pear", "honeydew"],
            "q3"
        );
        var color = await inquirer.Checkbox(
            new CheckboxQ
            {
                Message = "What is your color?",
                Id = "q4",
                Options = ["red", "blue", "green", "yellow"],
                Validate = x => x.Length > 0 ? "" : "You must select at least one color",
                Desc = "The color of the person",
            }
        );

        var beefOk = await inquirer.Confirm("Is beef ok?", "q5");
        var porkOk = await inquirer.Confirm(
            new ConfirmQ
            {
                Message = "Is pork ok?",
                Id = "q6",
                Desc = "Whether the person likes pork",
                Default = true,
                ErrorMessage = "You must tell me if you like pork",
            }
        );

        var birthday = await inquirer.DateSelect(
            "What is your birthday",
            "q7",
            "State your birthday"
        );
        var mumBirthday = await inquirer.DateSelect(
            new DateQ
            {
                Message = "What is your mum's birthday?",
                Id = "q8",
                Desc = "The birthday of your mum",
                Default = new DateOnly(1980, 1, 1),
                MaxDate = new DateOnly(2025, 12, 31),
                MinDate = new DateOnly(1900, 1, 1),
            }
        );

        var password = await inquirer.Password("What is your password?", "q9");
        var pin = await inquirer.Password(
            new PasswordQ
            {
                Message = "What is your pin?",
                Id = "q10",
                Desc = "The pin of the person",
                Confirmation = true,
                Validate = x => x.ToLower() == x ? "You must have a capital letter" : "",
            }
        );

        var car = await inquirer.Select(
            "What is your favourite car?",
            [
                "BMW",
                "Mercedes",
                "Audi",
                "Volkswagen",
                "Toyota",
                "Honda",
                "Ford",
                "Chevrolet",
                "Nissan",
                "Hyundai",
                "Kia",
                "Volvo",
                "Jeep",
                "Land Rover",
                "Lexus",
                "Mazda",
                "Mercury",
                "Mitsubishi",
                "Pontiac",
                "Saab",
                "Skoda",
                "Suzuki",
                "Toyota",
                "Volkswagen",
                "Volvo",
            ],
            "q11",
            "State your favourite car"
        );
        var plane = await inquirer.Select(
            new SelectQ
            {
                Message = "What is your favourite plane?",
                Id = "q12",
                Desc = "The plane of the person",
                Options =
                [
                    "Boeing",
                    "Airbus",
                    "Bombardier",
                    "Embraer",
                    "Cessna",
                    "Piper",
                    "Hawker",
                    "Dassault",
                    "Lockheed",
                    "Beechcraft",
                    "Gulfstream",
                    "Cessna",
                    "Piper",
                    "Hawker",
                    "Dassault",
                    "Lockheed",
                    "Beechcraft",
                    "Gulfstream",
                ],
                Validate = x => x == "Airbus" ? "You must not select Airbus" : "",
            }
        );

        return new Cyan
        {
            Processors =
            [
                new CyanProcessor
                {
                    Name = "hello",
                    Files =
                    [
                        new CyanGlob
                        {
                            Glob = "**/*.*",
                            Exclude = [],
                            Type = GlobType.Template,
                        },
                    ],
                    Config = new
                    {
                        Name = name,
                        Age = age,
                        Food = food,
                        Color = color,
                        Beef = beefOk,
                        Pork = porkOk,
                        Birthday = birthday,
                        MumBirthday = mumBirthday,
                        Password = password,
                        Pin = pin,
                        Car = car,
                        Plane = plane,
                    },
                },
            ],
            Plugins = [],
        };
    }
);
