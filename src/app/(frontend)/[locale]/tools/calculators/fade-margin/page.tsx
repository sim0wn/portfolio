"use client"

import { CableIcon, MinusIcon, PlugIcon, PlugZap, PlusIcon } from "lucide-react"
import { useState } from "react"

import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components"

import {
  Antenna,
  FreeSpace,
  LinkBudgetManager,
  PassiveComponent,
  RadioComponent,
  Role,
} from "./_lib/wireless-link-budget"

export default function FadeMarginPage() {
  const [linkBudgetManager, setLinkBudgetManager] = useState(
    new LinkBudgetManager(),
  )

  const availableLinkElements = [
    new RadioComponent(
      "Access Point",
      Role.TX,
      0,
      "Potência do Access Point em dBm.",
    ),
    new Antenna("Antena", "Amplificação da antena em dBi.", Role.TX, 0),
    new PassiveComponent(
      "Cabo",
      "Adiciona a perda do cabo em dB.",
      Role.TX,
      0,
      <CableIcon />,
      { unit: "m", value: 1 },
    ),
    new PassiveComponent(
      "Conector",
      "Adiciona a perda do conector em dB.",
      Role.TX,
      0.2,
      <PlugIcon />,
      { unit: "unidade", value: 2 },
    ),
    new FreeSpace("Distância", "Distância do enlace em quilômetros (km).", 0),
    new PassiveComponent(
      "Protetor de Surtos",
      "Adiciona a perda do protetor de surto em dB.",
      Role.TX,
      2,
      <PlugZap />,
    ),
  ]

  return (
    <div className="container grid grid-cols-2 py-6">
      <header>
        <menu className="flex flex-col gap-4">
          {availableLinkElements.map((component, index) => (
            <Item key={index}>
              <ItemMedia variant={"icon"}>{component.icon}</ItemMedia>
              <ItemContent>
                <ItemTitle>{component.name}</ItemTitle>
                <ItemDescription>{component.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  onClick={() => {
                    setLinkBudgetManager((previous) => {
                      previous.addComponent(component)
                      return new LinkBudgetManager([
                        ...previous.getComponents(),
                      ])
                    })
                  }}
                >
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </menu>
      </header>
      <section>
        <ul>
          {linkBudgetManager.getComponents().map((linkComponent, index) => (
            <Item key={index}>
              <ItemMedia variant={"icon"}>{linkComponent.icon}</ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <Input
                    onChange={(event) => {
                      setLinkBudgetManager((previous) => {
                        previous.getComponents()[index].name =
                          event.target.value
                        return new LinkBudgetManager([
                          ...previous.getComponents(),
                        ])
                      })
                    }}
                    value={linkComponent.name}
                  />
                </ItemTitle>
                <ItemDescription>{linkComponent.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <InputGroup>
                  <InputGroupInput
                    min={0}
                    onChange={(event) => {
                      const rawValue = event.target.value
                      if (rawValue === "") return
                      const parsedValue = parseFloat(rawValue)
                      if (isNaN(parsedValue)) return
                      setLinkBudgetManager((previous) => {
                        previous.getComponents()[index].setValue(parsedValue)
                        return new LinkBudgetManager([
                          ...previous.getComponents(),
                        ])
                      })
                    }}
                    step={0.01}
                    type="number"
                    value={linkComponent.getValue()}
                  />
                  {linkComponent.unit && (
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>{linkComponent.unit}</InputGroupText>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                {linkComponent.multiplier && (
                  <InputGroup>
                    <InputGroupInput
                      onChange={(event) => {
                        const rawValue = event.target.value
                        if (rawValue === "") return
                        const parsedValue = parseFloat(rawValue)
                        if (isNaN(parsedValue)) return
                        setLinkBudgetManager((previous) => {
                          previous.getComponents()[index].multiplier = {
                            unit: linkComponent.multiplier?.unit || "",
                            value: parsedValue,
                          }
                          return new LinkBudgetManager([
                            ...previous.getComponents(),
                          ])
                        })
                      }}
                      type="number"
                      value={linkComponent.multiplier.value}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>
                        {linkComponent.multiplier.unit}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                )}
                <ButtonGroup>
                  {linkComponent.role !== Role.FREE_SPACE && (
                    <Select
                      onValueChange={(value) => {
                        setLinkBudgetManager((previous) => {
                          previous.getComponents()[index].role = parseInt(
                            value,
                          ) as Role
                          return new LinkBudgetManager([
                            ...previous.getComponents(),
                          ])
                        })
                      }}
                      value={linkComponent.role.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Direção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.TX.toString()}>TX</SelectItem>
                        <SelectItem value={Role.RX.toString()}>RX</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <Button
                    onClick={() => {
                      setLinkBudgetManager((previous) => {
                        previous.removeComponent(index)
                        return new LinkBudgetManager([
                          ...previous.getComponents(),
                        ])
                      })
                    }}
                  >
                    <MinusIcon />
                  </Button>
                </ButtonGroup>
              </ItemActions>
            </Item>
          ))}
        </ul>
      </section>
      <footer className="col-span-full flex gap-4">
        <p>
          Potência efetivamente irradiada{" "}
          {linkBudgetManager.getEffectiveRadiatedPower()} dB
        </p>
        <p>Perda em espaço livre {linkBudgetManager.getPathLoss()} dB</p>
        <p>
          Sensibilidade efetiva do receptor{" "}
          {linkBudgetManager.getEffectiveSensitivity()} dB
        </p>
        <p>Margem de desvanecimento {linkBudgetManager.getFadeMargin()} dB</p>
      </footer>
    </div>
  )
}
