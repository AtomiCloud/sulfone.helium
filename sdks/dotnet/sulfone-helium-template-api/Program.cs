using sulfone_helium;
using sulfone_helium.Domain.Core;
using sulfone_helium.Domain.Core.Questions;

CyanEngine.StartTemplate(
    args,
    async Task<Cyan> (i, d) =>
    {
        var name = await i.Text("What is your name?", "q1");
        var age = await i.Text(
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

        var food = await i.Checkbox(
            "What is your food?",
            ["apple", "orange", "pear", "honeydew"],
            "q3"
        );
        var color = await i.Checkbox(
            new CheckboxQ
            {
                Message = "What is your color?",
                Id = "q4",
                Options = ["red", "blue", "green", "yellow"],
                Desc = "The color of the person",
            }
        );

        var beefOk = await i.Confirm("Is beef ok?", "q5");
        var porkOk = await i.Confirm(
            new ConfirmQ
            {
                Message = "Is pork ok?",
                Id = "q6",
                Desc = "Whether the person likes pork",
                Default = true,
                ErrorMessage = "You must tell me if you like pork",
            }
        );

        var birthday = await i.DateSelect("What is your birthday", "q7", "State your birthday");
        var mumBirthday = await i.DateSelect(
            new DateQ
            {
                Message = "What is your mum's birthday?",
                Id = "q8",
                Desc = "The birthday of your mum",
                Default = new DateOnly(1980, 1, 1),
                MaxDate = new DateOnly(2025, 12, 31),
                MinDate = new DateOnly(1900, 1, 1),
                Validate = x =>
                    DateOnly.TryParse(x, out var date)
                        ? date.Month == 12
                            ? null
                            : "Needs to be in December"
                        : "Needs to be a date",
            }
        );

        var password = await i.Password("What is your password?", "q9");
        var pin = await i.Password(
            new PasswordQ
            {
                Message = "What is your pin?",
                Id = "q10",
                Desc = "The pin of the person",
                Confirmation = true,
                Validate = x => x.ToLower() == x ? "You must have a capital letter" : "",
            }
        );

        var car = await i.Select(
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
        var plane = await i.Select(
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
            }
        );

        var time = d.Get("time", () => "7");

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
                        Time = time,
                    },
                },
            ],
            Plugins = [],
        };
    }
);
