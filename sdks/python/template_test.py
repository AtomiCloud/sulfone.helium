import datetime

from cyanprintsdk.domain.core.cyan import Cyan, CyanProcessor, CyanGlob, GlobType
from cyanprintsdk.domain.core.deterministic import IDeterminism
from cyanprintsdk.domain.core.inquirer import IInquirer
from cyanprintsdk.main import start_template_with_fn
from cyanprintsdk.domain.core.question import (
    TextQ,
    CheckboxQ,
    ConfirmQ,
    DateQ,
    PasswordQ,
    SelectQ,
)


async def template(i: IInquirer, d: IDeterminism) -> Cyan:
    name = await i.text("What is your name?", "q1")

    age = await i.textQ(
        TextQ(
            message="What is your age?",
            id="q2",
            desc="The age of the person",
            default="20",
            initial="18",
            validate=lambda x: "" if x.isdigit() else "Needs to be a number",
        )
    )

    food = await i.checkbox(
        "What is your food?", "q3", ["apple", "orange", "pear", "honeydew"]
    )

    color = await i.checkboxQ(
        CheckboxQ(
            message="What is your color?",
            id="q4",
            options=["red", "blue", "green", "yellow"],
            desc="The color of the person",
        )
    )

    beef_ok = await i.confirm("Is beef ok?", "q5")

    pork_ok = await i.confirmQ(
        ConfirmQ(
            message="Is pork ok?",
            id="q6",
            desc="Whether the person likes pork",
            default=True,
            error_message="You must tell me if you like pork",
        )
    )

    birthday = await i.date_select("What is your birthday", "q7", "State your birthday")

    def validate_december_date(x):
        # If it's already a date object
        if isinstance(x, datetime.date):
            return "" if x.month == 12 else "Needs to be in December"

        # If it's a string, try to parse it
        if isinstance(x, str):
            try:
                date_obj = datetime.datetime.strptime(x, "%Y-%m-%d").date()
                return "" if date_obj.month == 12 else "Needs to be in December"
            except ValueError:
                return "Needs to be a valid date format (YYYY-MM-DD)"

        # Otherwise, it's an invalid type
        return "Needs to be a date"

    mum_birthday = await i.date_selectQ(
        DateQ(
            message="What is your mum's birthday?",
            id="q8",
            desc="The birthday of your mum",
            default=datetime.date(1980, 1, 1),
            max_date=datetime.date(2025, 12, 31),
            min_date=datetime.date(1900, 1, 1),
            validate=validate_december_date,
        )
    )

    password = await i.password("What is your password?", "q9")

    pin = await i.passwordQ(
        PasswordQ(
            message="What is your pin?",
            id="q10",
            desc="The pin of the person",
            confirmation=True,
            validate=lambda x: (
                "" if any(c.isupper() for c in x) else "You must have a capital letter"
            ),
        )
    )

    car = await i.select(
        "What is your favourite car?",
        "q11",
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
        "State your favourite car",
    )

    plane = await i.selectQ(
        SelectQ(
            message="What is your favourite plane?",
            id="q12",
            desc="The plane of the person",
            options=[
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
        )
    )

    t = d.get("time", lambda: "7")

    c = Cyan(
        plugins=[],
        processors=[
            CyanProcessor(
                name="hello",
                files=[
                    CyanGlob(
                        root=None,
                        glob="**/*.*",
                        exclude=[],
                        type=GlobType.Template,
                    )
                ],
                config={
                    "Name": name,
                    "Age": age,
                    "Food": food,
                    "Color": color,
                    "Beef": beef_ok,
                    "Pork": pork_ok,
                    "Birthday": birthday,
                    "MumBirthday": mum_birthday,
                    "Password": password,
                    "Pin": pin,
                    "Car": car,
                    "Plane": plane,
                    "Time": t,
                },
            )
        ],
    )
    return c


start_template_with_fn(template)
