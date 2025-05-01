from typing import Awaitable

from cyanprintsdk.domain.core.cyan import Cyan, CyanProcessor
from cyanprintsdk.domain.core.deterministic import IDeterminism
from cyanprintsdk.domain.core.inquirer import IInquirer
from cyanprintsdk.main import start_template_with_fn
from cyanprintsdk.domain.core.question import TextQ


async def template(i: IInquirer, d: IDeterminism) -> Awaitable[Cyan]:
    name = await i.text("Can i get your name?", "q1")

    age = await i.textQ(
        TextQ(message="Can I get your age?", id="q2", validate=lambda x: x.isdigit())
    )

    food = await i.checkbox(
        "What is your favorite food?", "q3", ["pizza", "burger", "fries"]
    )

    return Cyan(
        plugins=[],
        processors=[
            CyanProcessor(
                name="hello", files=[], config={"name": name, "age": age, "food": food}
            )
        ],
    )


start_template_with_fn(template)
